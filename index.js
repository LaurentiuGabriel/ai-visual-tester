const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * Encodes the provided file into a base64 string.
 * @param {File} file - The file to be encoded.
 * @returns {Promise<string>} A promise that resolves to the base64 encoded string.
 */
function encodeImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.replace(/^data:.+;base64,/, '');
            resolve(base64String);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

/**
 * Sends a chat request to OpenAI using an image file.
 * @param {File} file - The image file to be analyzed.
 * @returns {Promise<string[]>} A promise that resolves to the chat response lines.
 */
async function testPhoto(file) {
    const base64Image = await encodeImage(file);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    };

    const payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Act as a top quality engineer. I want you to analyze what is in this image. It is supposed to be the user interface of an application. Check for visual isues, incosistencies, UX issues. You don't need context, you just judge by what you see. Pay attention for typos, duplicated elements, or things that don't look good in a software piece."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": `data:image/jpeg;base64,${base64Image}`
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const responseJson = await response.json();
        const messageContent = responseJson.choices[0].message.content;
        return messageContent.split('\n');
    } catch (error) {
        console.error("Error during API request:", error);
        throw error;
    }
}

module.exports = { testPhoto, encodeImage };
