# PrepAI

### Short Description
An AI-powered meal planning application that uses computer vision to analyze your ingredients and GPT-5 to generate personalized weekly meal plans with shopping lists and prep schedules.

### Long Description
AI Meal Planner revolutionizes how you plan meals by combining cutting-edge AI technologies. Upload photos of your refrigerator or pantry, and our computer vision system identifies available ingredients. The AI then generates personalized meal plans that maximize what you already have while staying within your budget and dietary preferences.

The application integrates with Kroger's API to provide real-time pricing and product availability, ensuring your shopping lists are accurate and cost-effective. Whether you're a beginner cook or a culinary expert, the AI adapts to your skill level and preferences, offering everything from quick 30-minute meals to elaborate weekend projects.

Key features include image-based ingredient recognition, interactive AI assistant, nutrition tracking, native iOS sharing, and smart store detection. The app helps reduce food waste, save money, and make healthy eating effortless.

## Setup Instructions

### Authentication (Clerk)

This app uses Clerk for authentication. To set up Clerk:

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in your Clerk dashboard
3. Get your publishable key from the Clerk dashboard
4. Set the environment variable:
   ```bash
   export EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```
   
   Or create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

5. Update the `src/app/_layout.tsx` file with your actual publishable key if you prefer to hardcode it.

### Features Implemented

- **Forgot Password Flow**: Users can reset their password using Clerk's password reset functionality
- **Email Validation**: Proper email validation with user-friendly error messages
- **Error Handling**: Comprehensive error handling for various Clerk error codes
- **Loading States**: Loading indicators during password reset process
- **Navigation**: Proper navigation flow back to login screen after password reset
