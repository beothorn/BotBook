import { Message } from "../OpenAiApi";

export function generateContact(profileDescription: string): Message[]{
  return [
    {"role": "system", "content": `You are a profile generator for an app that creates fake people profilesin JSON format.`},
    {"role": "user", "content": `Create a profile for a person in a JSON format.
    Come up with a name, background story, current situation, physical appearance and other things. Based on the profile add a description of the whatsapp avatar picture for this person. Don't mention the person name, only profession. Be descriptive and use third person. Avoid filler words. Start with the person facial details, then be very detailed describe appearance, light conditions, picture quality, clothes, picture framing, background and so on.
    Some examples:
    {
        "userProfile": "A child doctor in Germany.",
        "name": "Dr. Hannah Müller",
        "background": "Dr. Hannah Müller grew up in a small town in Germany and always knew she wanted to be a doctor. After completing her medical degree and specialization in pediatrics, she decided to move to Berlin to pursue her career. She is now a well-respected doctor in the city, known for her compassionate and caring approach to her patients.",
        "current": "Dr. Müller currently works at a children's hospital in Berlin and is highly regarded by her colleagues and patients' families. She is known for going above and beyond to make sure her young patients receive the best care possible.",
        "appearance": "Dr. Müller is in her late thirties and has a friendly, approachable demeanor. She has warm brown eyes, a heart-shaped face, and long brown hair that she usually wears in a ponytail.",
        "likes": "beach, poetry, music",
        "dislikes": "computers, smoke",
        "chatCharacteristics": "She has a slight German accent when she speaks English.",
        "avatar": "Profile picture of blonde white female, young 30 years old, soft ligh, white lab coat over a colorful blouse, stethoscope, warm brown eyes, a heart-shaped face, long brown hair ponytail closeup, soft lights, professionalism, warmth, competence, 4k, high quality. background, office, bookshelf medical poster."
    }
    Another example:
    {
        "userProfile": "A software developer.",
        "name": "Alejandro Vargas",
        "background": "Alejandro Vargas, or Alex, was bor in Mexico City in 1985. From a young age he loved working with computers, specially after getting an Apple 2 from his father. Graduated from Mexico City university, he was offered a position as Software engineer at IBM to work in San Francisco, California. After that he is became a successful Engineer, working for many startups.",
        "current": "Working in a startup for climate friendly solutions for device chargers.",
        "appearance": "Alejandro is a friendly looking, tall Mexican. He has green eyes, and short black hair. He has a beard and wear blue glasses.",
        "likes": "computers, ai, cars",
        "dislikes": "loud music, cold, soccer",
        "chatCharacteristics": "Perfect English, with some emojis.",
        "avatar": "Profile picutre of Mexican middle aged 40 year old tall green eyes, hard light closeup short black hair sunglasses smiling sunny beach,  detailed face,."
    }
    Now create a profile for userProfile:
    ${profileDescription}`}
  ]
}