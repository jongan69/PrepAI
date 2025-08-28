# PrepAI - AI-Powered Health & Fitness Companion

## 🎯 Overview

### Short Description
PrepAI is a comprehensive health and fitness application that combines AI-powered meal planning, workout tracking, and progress monitoring. The app provides personalized health insights, workout routines, and nutrition tracking to help users achieve their fitness goals.

### Long Description
PrepAI revolutionizes personal health and fitness management by combining cutting-edge technology with user-friendly design. The application serves as your complete health companion, offering comprehensive workout tracking, detailed progress analytics, and intelligent meal planning capabilities.

The app features a robust workout library with 100+ pre-built routines across strength training, cardio, yoga, pilates, and functional fitness categories. Users can log detailed workout sessions, track exercises with sets, reps, weights, and rest periods, and monitor their progress over time with visual charts and analytics.

For nutrition and meal planning, PrepAI integrates with the Edamam recipe database to provide thousands of healthy meal options. The app includes comprehensive food logging, nutrition tracking with detailed macro and micronutrient analysis, and personalized meal suggestions based on user preferences and dietary restrictions.

Health monitoring is a core feature, allowing users to track weight entries with photo support, monitor daily water intake, log sleep quality and duration, and record mood and wellness indicators. The app provides insightful progress charts and goal tracking to keep users motivated and on track.

Built with React Native and Expo, PrepAI offers a seamless cross-platform experience across iOS, Android, and Web. The app features an offline-first architecture with local SQLite database and cloud synchronization, ensuring data is always accessible and secure.

The application includes advanced features like device integration for health data import/export, personalized goal setting, and a sophisticated monetization model with subscription tiers and premium features. Whether you're a fitness beginner or an experienced athlete, PrepAI adapts to your skill level and provides the tools needed to achieve your health and fitness objectives.

### Key Features
- **Comprehensive Fitness Tracking**: Workout logging, exercise library, progress analytics
- **Health Monitoring**: Weight, water, sleep, and nutrition tracking with detailed insights
- **Recipe Integration**: Access to thousands of recipes via Edamam API
- **Cross-Platform**: React Native with Expo for iOS, Android, and Web
- **Offline-First**: Local SQLite database with cloud sync
- **Advanced Analytics**: Visual charts, progress tracking, and goal monitoring
- **Monetization Ready**: Advanced money model with personalized offers
- **Device Integration**: Health app data import/export capabilities

## 🏗️ Architecture

### System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Mobile App - React Native]
        B[Web App - React Native Web]
        C[Expo Router Navigation]
    end
    
    subgraph "State Management"
        D[Zustand Stores]
        E[React Context Providers]
        F[Redux Toolkit]
    end
    
    subgraph "Data Layer"
        G[SQLite Database]
        H[Prisma ORM]
        I[Cloud Sync Service]
    end
    
    subgraph "API Layer"
        J[Expo Router API Routes]
        K[Kroger API Integration]
        L[Edamam Recipe API]
        M[AIML Vision API]
    end
    
    subgraph "Authentication"
        N[Clerk Auth]
        O[Token Management]
    end
    
    subgraph "External Services"
        P[PostgreSQL Database]
        Q[EAS Build & Deploy]
        R[Expo Updates]
    end
    
    A --> D
    B --> D
    C --> E
    D --> G
    E --> H
    F --> I
    G --> J
    H --> K
    I --> L
    J --> M
    N --> O
    O --> P
    Q --> R
```

### Database Schema

```mermaid
erDiagram
    User {
        string id PK
        string clerkId UK
        string name
        string email
        datetime createdAt
        datetime updatedAt
    }
    
    HealthProfile {
        string id PK
        string userId FK
        float height
        float weight
        int age
        string gender
        datetime birthday
        float targetWeight
        int targetCalories
        float targetWaterL
        string activityLevel
        string fitnessGoal
        string heightUnit
        string weightUnit
        datetime syncedAt
        boolean isDeleted
    }
    
    Workout {
        string id PK
        string userId FK
        string title
        string category
        int durationMin
        int calories
        datetime date
        string notes
        boolean isCompleted
        int totalTime
        int restTime
        datetime syncedAt
        boolean isDeleted
    }
    
    Exercise {
        string id PK
        string workoutId FK
        string name
        int sets
        int reps
        float weightKg
        int duration
        float distance
        int restTime
        int order
        boolean isCompleted
        datetime syncedAt
        boolean isDeleted
    }
    
    Meal {
        string id PK
        string userId FK
        string name
        string mealType
        int calories
        float protein
        float carbs
        float fat
        datetime date
        string notes
        datetime syncedAt
        boolean isDeleted
    }
    
    MealItem {
        string id PK
        string mealId FK
        string userId FK
        string name
        int calories
        float protein
        float carbs
        float fat
        float quantity
        string unit
        boolean isHighInProtein
        datetime syncedAt
        boolean isDeleted
    }
    
    ProgressLog {
        string id PK
        string userId FK
        datetime date
        float waterL
        float sleepHrs
        string mood
        float weightKg
        int steps
        int activeMinutes
        datetime syncedAt
        boolean isDeleted
    }
    
    WeightEntry {
        string id PK
        string userId FK
        float weightKg
        datetime date
        string photo
        string notes
        float bodyFatPercentage
        float muscleMassKg
        datetime syncedAt
        boolean isDeleted
    }
    
    WaterIntake {
        string id PK
        string userId FK
        int amountMl
        datetime date
        datetime time
        datetime syncedAt
        boolean isDeleted
    }
    
    SleepEntry {
        string id PK
        string userId FK
        float hours
        string quality
        datetime date
        datetime bedtime
        datetime wakeTime
        string notes
        datetime syncedAt
        boolean isDeleted
    }
    
    Goal {
        string id PK
        string userId FK
        string type
        float target
        float current
        string unit
        datetime startDate
        datetime endDate
        boolean isActive
        string notes
        datetime syncedAt
        boolean isDeleted
    }
    
    User ||--o{ HealthProfile
    User ||--o{ Workout
    User ||--o{ Meal
    User ||--o{ MealItem
    User ||--o{ ProgressLog
    User ||--o{ WeightEntry
    User ||--o{ WaterIntake
    User ||--o{ SleepEntry
    User ||--o{ Goal
    Workout ||--o{ Exercise
    Meal ||--o{ MealItem
```

### Application Flow

```mermaid
flowchart TD
    A[User Opens App] --> B{Authenticated?}
    B -->|No| C[Onboarding Flow]
    B -->|Yes| D{First Time User?}
    
    C --> E[Welcome Screen]
    E --> F[Personal Info Collection]
    F --> G[Goals Selection]
    G --> H[Health Profile Setup]
    H --> I[Complete Onboarding]
    
    D -->|Yes| C
    D -->|No| J[Main App]
    
    J --> K[Home Dashboard]
    K --> L{User Action}
    
    L -->|Meal Planning| M[AI Meal Generator]
    L -->|Workout Tracking| N[Workout Library]
    L -->|Progress View| O[Analytics Dashboard]
    L -->|Profile| P[User Settings]
    
    M --> Q[Image Upload]
    Q --> R[Computer Vision Analysis]
    R --> S[Recipe Generation]
    S --> T[Shopping List]
    
    N --> U[Exercise Selection]
    U --> V[Workout Logging]
    V --> W[Progress Tracking]
    
    O --> X[Charts & Insights]
    X --> Y[Goal Progress]
    
    P --> Z[Health Profile]
    Z --> AA[Device Sync]
    AA --> BB[Data Export]
```

## 🚀 Features

### Core Features

#### 1. AI-Powered Meal Planning
- **Computer Vision**: Upload photos of ingredients for automatic recognition
- **GPT-4 Integration**: Generate personalized meal plans based on preferences
- **Recipe Database**: Access to thousands of recipes via Edamam API
- **Shopping Lists**: Automated grocery lists with Kroger pricing
- **Nutrition Tracking**: Detailed macro and micronutrient analysis

#### 2. Fitness Tracking
- **Workout Library**: 100+ pre-built workouts across categories
- **Exercise Tracking**: Log sets, reps, weights, and rest periods
- **Progress Analytics**: Visual charts and progress indicators
- **Goal Setting**: Personalized fitness targets and milestones

#### 3. Health Monitoring
- **Weight Tracking**: Daily weight entries with photo support
- **Water Intake**: Hydration monitoring with reminders
- **Sleep Tracking**: Sleep quality and duration logging
- **Mood Tracking**: Daily mood and wellness indicators

#### 4. Smart Features
- **Offline Support**: Full functionality without internet
- **Cloud Sync**: Automatic data synchronization
- **Device Integration**: Health app data import/export
- **Personalization**: AI-driven recommendations

### Technical Features

#### 1. Cross-Platform Development
- **React Native**: Native performance on mobile
- **Expo**: Rapid development and deployment
- **Web Support**: Full web application
- **TypeScript**: Type-safe development

#### 2. Data Management
- **SQLite**: Local database for offline functionality
- **Prisma ORM**: Type-safe database operations
- **Zustand**: Lightweight state management
- **Redux Toolkit**: Advanced state management

#### 3. API Integration
- **Kroger API**: Real-time grocery pricing
- **Edamam API**: Recipe database access
- **AIML API**: Computer vision capabilities
- **Clerk Auth**: Secure authentication

#### 4. Monetization
- **Money Model**: Advanced offer sequencing
- **Personalization**: User behavior analysis
- **A/B Testing**: Offer optimization
- **Analytics**: Conversion tracking

## 📱 Screens & Navigation

### Navigation Structure

```mermaid
graph TD
    A[App Root] --> B[Authentication]
    A --> C[Onboarding]
    A --> D[Main App]
    
    B --> E[Login]
    B --> F[Signup]
    B --> G[Forgot Password]
    
    C --> H[Welcome]
    C --> I[Personal Info]
    C --> J[Goals Selection]
    C --> K[Complete]
    
    D --> L[Drawer Navigation]
    L --> M[Home Tab]
    L --> N[Workouts Tab]
    L --> O[Meals Tab]
    L --> P[Progress Tab]
    L --> Q[Profile]
    
    M --> R[Dashboard]
    M --> S[Quick Actions]
    
    N --> T[Workout Library]
    N --> U[Add Workout]
    N --> V[Workout History]
    
    O --> W[Meal Planning]
    O --> X[Food Logging]
    O --> Y[Recipe Search]
    
    P --> Z[Analytics]
    P --> AA[Charts]
    P --> BB[Goals]
    
    Q --> CC[Settings]
    Q --> DD[Subscription]
    Q --> EE[Help]
```

### Screen Categories

#### 1. Authentication & Onboarding
- Welcome/Introduction screens
- Personal information collection
- Goals and preferences setup
- Health profile configuration

#### 2. Main Application
- Home dashboard with overview
- Workout tracking and library
- Meal planning and logging
- Progress analytics and charts

#### 3. Profile & Settings
- User profile management
- Subscription and billing
- Device connections
- Data export/import

## 🛠️ Technology Stack

### Frontend
- **React Native**: 0.79.5
- **Expo**: 53.0.22
- **TypeScript**: 5.8.3
- **NativeWind**: 4.1.23 (Tailwind CSS for React Native)
- **React Navigation**: Drawer and Tab navigation
- **Reanimated**: 3.17.5 for animations

### Backend & APIs
- **Expo Router**: File-based routing with API routes
- **Prisma**: Database ORM with PostgreSQL
- **Clerk**: Authentication and user management
- **Kroger API**: Grocery store integration
- **Edamam API**: Recipe database
- **AIML API**: Computer vision services

### State Management
- **Zustand**: Lightweight state management
- **Redux Toolkit**: Advanced state management
- **React Context**: Theme and database providers

### Database
- **SQLite**: Local mobile database
- **PostgreSQL**: Cloud database
- **Prisma Accelerate**: Database connection pooling

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **EAS Build**: App building and deployment

## 📊 Data Flow

### Sync Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant L as Local DB
    participant S as Sync Store
    participant API as API Routes
    participant C as Cloud DB
    
    U->>A: Perform Action
    A->>L: Save to Local DB
    A->>S: Add Sync Operation
    S->>API: Send Sync Request
    API->>C: Update Cloud DB
    C->>API: Confirm Update
    API->>S: Mark as Synced
    S->>L: Update Local Record
    A->>U: Show Success
```

### API Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant R as Router
    participant A as Auth
    participant S as Service
    participant E as External API
    participant D as Database
    
    C->>R: API Request
    R->>A: Validate Token
    A->>R: User ID
    R->>S: Process Request
    S->>E: External API Call
    E->>S: Response Data
    S->>D: Save/Update Data
    D->>S: Confirmation
    S->>R: Formatted Response
    R->>C: JSON Response
```

## 🎯 Roadmap

### Phase 1: Foundation (Q1 2024) ✅
- [x] Core app architecture setup
- [x] Authentication system (Clerk)
- [x] Basic database schema
- [x] Onboarding flow
- [x] Home dashboard
- [x] Basic navigation structure

### Phase 2: Core Features (Q2 2024) ✅
- [x] Workout tracking system
- [x] Meal logging functionality
- [x] Progress tracking
- [x] Local database implementation
- [x] Basic sync functionality
- [x] UI/UX improvements

### Phase 3: AI Integration (Q3 2024) 🚧
- [ ] Computer vision for ingredient recognition
- [ ] GPT-4 meal plan generation
- [ ] Recipe recommendation engine
- [ ] Smart shopping list generation
- [ ] Nutritional analysis improvements

### Phase 4: Advanced Features (Q4 2024) 📋
- [ ] Advanced analytics and insights
- [ ] Social features and sharing
- [ ] Wearable device integration
- [ ] Meal prep scheduling
- [ ] Advanced goal tracking

### Phase 5: Monetization (Q1 2025) 📋
- [ ] Subscription system implementation
- [ ] Premium feature development
- [ ] Advanced money model
- [ ] A/B testing framework
- [ ] Analytics and optimization

### Phase 6: Scale & Optimize (Q2 2025) 📋
- [ ] Performance optimization
- [ ] Advanced sync capabilities
- [ ] Multi-language support
- [ ] Advanced personalization
- [ ] Enterprise features

## 📅 Sprint Planning

### Sprint 1: Authentication & Onboarding (2 weeks)
**Goals**: Complete user authentication and onboarding flow
- [x] Clerk authentication setup
- [x] Welcome screens
- [x] Personal information collection
- [x] Goals selection
- [x] Health profile setup
- [x] Onboarding completion

### Sprint 2: Core Navigation & Dashboard (2 weeks)
**Goals**: Establish main app navigation and home dashboard
- [x] Drawer navigation setup
- [x] Tab navigation implementation
- [x] Home dashboard design
- [x] Quick action buttons
- [x] Basic data display

### Sprint 3: Database & State Management (2 weeks)
**Goals**: Implement local database and state management
- [x] SQLite database setup
- [x] Prisma schema implementation
- [x] Zustand store creation
- [x] Data persistence
- [x] Basic CRUD operations

### Sprint 4: Workout Tracking (2 weeks)
**Goals**: Complete workout tracking functionality
- [x] Workout library
- [x] Exercise tracking
- [x] Workout logging
- [x] Progress visualization
- [x] Workout history

### Sprint 5: Meal Planning Foundation (2 weeks)
**Goals**: Basic meal planning and logging
- [x] Meal logging interface
- [x] Food database integration
- [x] Nutrition tracking
- [x] Meal history
- [x] Basic meal suggestions

### Sprint 6: Progress Tracking (2 weeks)
**Goals**: Comprehensive progress monitoring
- [x] Weight tracking
- [x] Water intake logging
- [x] Sleep tracking
- [x] Progress charts
- [x] Goal setting

### Sprint 7: Sync & Cloud Integration (2 weeks)
**Goals**: Implement cloud synchronization
- [x] Sync service setup
- [x] API routes implementation
- [x] Conflict resolution
- [x] Offline support
- [x] Data backup

### Sprint 8: AI Integration (3 weeks)
**Goals**: Implement AI-powered features
- [ ] Computer vision setup
- [ ] GPT-4 integration
- [ ] Recipe generation
- [ ] Smart recommendations
- [ ] Image analysis

### Sprint 9: Shopping & Recipes (2 weeks)
**Goals**: Shopping list and recipe features
- [ ] Kroger API integration
- [ ] Shopping list generation
- [ ] Recipe database
- [ ] Meal prep planning
- [ ] Cost optimization

### Sprint 10: Advanced Analytics (2 weeks)
**Goals**: Enhanced analytics and insights
- [ ] Advanced charts
- [ ] Trend analysis
- [ ] Predictive insights
- [ ] Performance metrics
- [ ] Goal progress tracking

### Sprint 11: Monetization Setup (2 weeks)
**Goals**: Implement monetization framework
- [ ] Subscription system
- [ ] Payment processing
- [ ] Premium features
- [ ] Money model implementation
- [ ] Offer sequencing

### Sprint 12: Polish & Launch Prep (2 weeks)
**Goals**: Final polish and launch preparation
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] UI/UX improvements
- [ ] Testing and QA
- [ ] App store preparation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun (recommended) or npm
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jongan69/prepai.git
   cd prepai
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Configure environment variables
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   DATABASE_URL=your_postgresql_url
   KROGER_CLIENT_ID=your_kroger_client_id
   KROGER_CLIENT_SECRET=your_kroger_client_secret
   EDAMAM_APP_ID=your_edamam_app_id
   EDAMAM_APP_KEY=your_edamam_app_key
   AIMLAPI_KEY=your_aiml_api_key
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   bun run db:generate
   
   # Run migrations
   bun run db:migrate
   ```

5. **Start Development Server**
   ```bash
   # Start Expo development server
   bun run dev
   
   # Start with tunnel for device testing
   bun run dev:tunnel
   
   # Platform-specific development
   bun run dev:ios
   bun run dev:android
   bun run dev:web
   ```

### Development Commands

```bash
# Development
bun run dev              # Start development server
bun run dev:web          # Web development
bun run dev:tunnel       # Tunnel for device testing

# Building
bun run prebuild         # Prebuild for native platforms
bun run build:all        # Build for all platforms
bun run export:web       # Export web build

# Database
bun run db:migrate       # Run database migrations
bun run db:generate      # Generate Prisma client

# Code Quality
bun run lint             # Run ESLint
bun run lint:fix         # Fix linting issues
bun run format           # Format code with Prettier

# Deployment
bun run deploy:web:dev   # Deploy web to development
bun run deploy:web:prod  # Deploy web to production
```

## 🏗️ Project Structure

```
PrepAI/
├── src/
│   ├── app/                    # Expo Router app directory
│   │   ├── (mobile)/          # Mobile-specific routes
│   │   │   ├── (index)/       # Main tab navigation
│   │   │   ├── (onboarding)/  # Onboarding flow
│   │   │   ├── (profile)/     # Profile and settings
│   │   │   ├── (workout)/     # Workout screens
│   │   │   └── (modals)/      # Modal screens
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── screens/          # Screen components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utility libraries
│   ├── services/             # Service layer
│   ├── stores/               # State management
│   └── utils/                # Utility functions
├── prisma/                   # Database schema and migrations
├── assets/                   # Static assets
├── dist/                     # Build output
└── docs/                     # Documentation
```

## 🔧 Configuration

### Environment Variables

```bash
# Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# External APIs
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key
AIMLAPI_KEY=your_aiml_api_key

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

### Build Configuration

The app uses EAS Build for cross-platform builds:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

## 🧪 Testing

### Test Structure
- **Unit Tests**: Jest for component and utility testing
- **Integration Tests**: API route testing
- **E2E Tests**: Detox for end-to-end testing (planned)

### Running Tests
```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/components/Button.test.tsx
```

## 📱 Deployment

### Mobile Deployment
1. **EAS Build**: Automated builds for iOS and Android
2. **App Store**: iOS App Store and Google Play Store
3. **TestFlight**: Beta testing for iOS
4. **Internal Testing**: Android internal testing

### Web Deployment
1. **Vercel**: Automatic deployments from main branch
2. **Netlify**: Alternative deployment option
3. **Custom Domain**: Configure custom domain

### Deployment Commands
```bash
# Build for production
bun run build:all

# Deploy web
bun run deploy:web:prod

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with custom rules
- **Prettier**: Code formatting
- **Conventional Commits**: Standard commit message format

### Pull Request Process
1. **Description**: Clear description of changes
2. **Testing**: Include tests for new features
3. **Documentation**: Update docs if needed
4. **Review**: Code review required
5. **Merge**: Squash and merge to main

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)

### Community
- [Discord Server](https://discord.gg/prepai)
- [GitHub Issues](https://github.com/jongan69/prepai/issues)
- [Email Support](mailto:support@prepai.com)

### Troubleshooting

#### Common Issues
1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **Database connection**: Check DATABASE_URL in .env
3. **Authentication**: Verify Clerk configuration
4. **Build failures**: Check EAS build logs

#### Performance Tips
1. **Image optimization**: Use appropriate image formats and sizes
2. **Bundle size**: Monitor with `expo doctor`
3. **Database queries**: Optimize with Prisma query analysis
4. **Memory usage**: Monitor with React Native Debugger

---

**PrepAI** - Revolutionizing health and fitness with AI-powered insights and personalized recommendations.
