import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_TOKEN;

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

const CATEGORIES = [
  'Bills',
  'Eating out',
  'Entertainment',
  'Groceries',
  'Housing',
  'Investment',
  'Personal care',
  'Salary',
  'Shopping',
  'Transport',
  'Trips',
];

export const classifyText = async (inputText) => {
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that classifies user input into the following categories: ${CATEGORIES.join(
              ', '
            )}. Respond only with the category name.`,
          },
          {
            role: 'user',
            content: inputText,
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const classification = response.data.choices[0].message.content.trim();
    return classification;
  } catch (error) {
    console.error('Error classifying text:', error.response?.data || error.message);
    throw error;
  }
};
