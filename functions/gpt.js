import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config()

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey
});

export async function createTitleAndDescription(title) {
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "I live in USA and want to make YouTube Shorts. My viewers are aged 18-26 (30%), 26-36 (20%), over 36 (40%), and the rest are under 18. My main audience is from English-speaking countries like the USA, UK, and Europe. When I give you a one-line English sentence, create a title and description for YouTube Shorts based on it. The output format should be separated by a comma, like 'title, description'. No need for extra embellishments; don't add quotes between title and description. my channel mainly features funny stories, so make the title and description interesting and amusing. always include #memes #askreddit #humor tags end of the title and description"},
            {"role": "user", "content": `${title}`},
        ],
        model: "gpt-4",
    });
    const GPT_RESPONSE = completion.choices[0].message.content.trim();
    return [GPT_RESPONSE.split(',')[0], GPT_RESPONSE.split(',')[1]];
}
