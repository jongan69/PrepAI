import React from 'react';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';

import AnimatedView from '@/components/AnimatedView';
import { Button } from '@/components/Button';
import Expandable from '@/components/Expandable';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';

// FAQ data
const faqData = [
  {
    id: '1',
    question: 'How do I track my workouts?',
    answer:
      'You can track your workouts by going to the Workouts section. Tap the "+" button to add a new workout, select exercises, and log your sets, reps, and weights. Your workout history will be saved automatically.',
  },
  {
    id: '2',
    question: 'How do I set my fitness goals?',
    answer:
      'Go to your Profile section and tap on "Goals". You can set goals for weight loss/gain, workout frequency, calories burned, or specific exercise targets. The app will track your progress automatically.',
  },
  {
    id: '3',
    question: 'Can I track my meals and calories?',
    answer:
      'Yes! Use the Meals section to log your food intake. You can search our extensive food database, scan barcodes, or add custom meals. The app will calculate your daily calories and macronutrients.',
  },
  {
    id: '4',
    question: 'How do I sync with fitness devices?',
    answer:
      'Go to Settings > Connected Apps to sync with popular fitness trackers like Apple Health, Google Fit, Fitbit, and more. This will automatically import your steps, heart rate, and other health data.',
  },
  {
    id: '5',
    question: 'What if I miss a workout day?',
    answer:
      "Don't worry! Consistency is more important than perfection. You can reschedule missed workouts or adjust your weekly plan. The app will help you get back on track with motivational reminders.",
  },
  {
    id: '6',
    question: 'How do I create custom workout plans?',
    answer:
      'In the Workouts section, tap "Create Plan" to build custom routines. Choose exercises from our library, set rest times, and save your plan. You can also duplicate and modify existing plans.',
  },
  {
    id: '7',
    question: 'Can I track my body measurements?',
    answer:
      'Yes! Go to Progress section to log weight, body fat percentage, measurements, and progress photos. The app will create visual charts to help you track your transformation over time.',
  },
  {
    id: '8',
    question: 'How do workout reminders work?',
    answer:
      'Set up workout reminders in Settings > Notifications. You can choose specific times, days of the week, and customize reminder messages to help you stay consistent with your fitness routine.',
  },
];

// Contact information
const contactInfo = [
  {
    id: 'email',
    type: 'Email Support',
    value: 'support@caloria.com',
    icon: 'Mail' as const,
    action: () => Linking.openURL('mailto:support@caloria.com'),
  },
  {
    id: 'phone',
    type: 'Phone Support',
    value: '+1 (800) 555-FIT1',
    icon: 'Phone' as const,
    action: () => Linking.openURL('tel:+18005553481'),
  },
  {
    id: 'hours',
    type: 'Support Hours',
    value: 'Monday-Friday: 8am-8pm EST',
    icon: 'Clock' as const,
    action: undefined,
  },
];

export default function HelpScreen() {
  return (
    <View className="dark:bg-dark-primary flex-1 bg-background">
      <Header
        title="Help & Support"
        showBackButton
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AnimatedView
          animation="fadeIn"
          duration={400}>
          {/* FAQ Section */}
          <Section
            title="Frequently Asked Questions"
            titleSize="xl"
            className="px-global pb-2 pt-6"
          />

          <View className="px-global">
            {faqData.map((faq) => (
              <Expandable
                key={faq.id}
                title={faq.question}
                className="py-1">
                <ThemedText className="text-light-text dark:text-dark-text leading-6">{faq.answer}</ThemedText>
              </Expandable>
            ))}
          </View>

          {/* Contact Section */}
          <Section
            title="Contact Us"
            titleSize="xl"
            className="mt-14 px-global pb-2"
            subtitle="We're here to help with any questions or concerns"
          />

          <View className="px-global pb-8">
            {contactInfo.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                onPress={contact.action}
                disabled={!contact.action}
                className="flex-row items-center border-b border-border py-4">
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Icon
                    name={contact.icon}
                    size={20}
                  />
                </View>
                <View>
                  <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">{contact.type}</ThemedText>
                  <ThemedText className="font-medium">{contact.value}</ThemedText>
                </View>
                {contact.action && (
                  <Icon
                    name="ChevronRight"
                    size={20}
                    className="text-light-subtext dark:text-dark-subtext ml-auto"
                  />
                )}
              </TouchableOpacity>
            ))}

            <Button
              title="Email Us"
              iconStart="Mail"
              className="mt-8"
              onPress={() => Linking.openURL('mailto:support@caloria.com')}
            />
          </View>
        </AnimatedView>
      </ScrollView>
    </View>
  );
}
