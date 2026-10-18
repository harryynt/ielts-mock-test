import { Test } from '../types/test';

export const sampleReadingTest: Test = {
  id: 'reading-demo-001',
  skill: 'reading',
  title: 'Urban Farming in Smart Cities',
  module: 'academic',
  durationMinutes: 60,
  sections: [
    {
      id: 'part-1',
      title: 'Part 1',
      passage: `The idea of urban farming is no longer a fringe experiment. In many cities, rooftops, vertical walls, and abandoned lots are being transformed into productive spaces. Local governments have begun to recognise the value of growing food near consumers, especially in high-density neighbourhoods where fresh produce is expensive and inconsistent in quality.\n\nUrban agriculture can reduce transport costs, shorten supply chains, and lower the environmental footprint of food distribution. It also creates opportunities for community engagement. Schools, cooperatives, and small businesses are increasingly involved in these projects, and many residents view them as a practical answer to climate stress and food insecurity.\n\nHowever, urban farming requires careful planning. Soil contamination remains a serious concern in former industrial areas, and water usage must be managed efficiently in cities where infrastructure is already under pressure. Some projects use hydroponics, where plants are grown in nutrient-rich water rather than soil, while others rely on composting and rainwater capture. Although these methods can improve resilience, they also demand technical skill and constant maintenance.\n\nThe economic case is mixed. Some farms are designed to make a profit, while others focus on social benefits such as education, public health, and neighbourhood regeneration. Research continues to compare long-term outcomes, but early data suggests that well-integrated urban farms can improve local food security without sacrificing environmental goals.`,
      audioUrl: null,
      transcript: null,
      questionGroups: [
        {
          id: 'g1',
          type: 'multiple_choice_single',
          instruction: 'Choose the correct answer.',
          options: ['A. The land is always expensive.', 'B. It can lower transport cost and support local food supply.', 'C. It is only suitable for rural regions.', 'D. It replaces all supermarkets.'],
          questions: [
            {
              id: 'q1',
              number: 1,
              text: 'According to the passage, one benefit of urban farming is that it',
              acceptedAnswers: ['b'],
              explanation: 'The passage states that urban agriculture can reduce transport costs and shorten supply chains, benefiting local food supply.'
            }
          ]
        },
        {
          id: 'g2',
          type: 'true_false_not_given',
          instruction: 'Do the following statements agree with the information in the passage?',
          questions: [
            {
              id: 'q2',
              number: 2,
              text: 'Urban farming projects are appearing mainly in suburban housing developments.',
              acceptedAnswers: ['false'],
              explanation: 'The passage specifically refers to high-density neighbourhoods and urban spaces, not suburban developments.'
            },
            {
              id: 'q3',
              number: 3,
              text: 'Soil contamination is a challenge for some urban farming sites.',
              acceptedAnswers: ['true'],
              explanation: 'The writer states that soil contamination remains a serious concern in former industrial areas.'
            }
          ]
        }
      ]
    },
    {
      id: 'part-2',
      title: 'Part 2',
      passage: `Many cities are exploring how urban gardens can support public health. In places where residents have limited access to affordable fruit and vegetables, community plots can introduce more diverse diets. These schemes often involve local volunteers and can improve social cohesion by creating shared spaces for learning and cooperation.\n\nAt the same time, the practical challenges are significant. A lack of space, financial uncertainty, and unequal access to tools all limit the scale of these projects. Some initiatives fail because they rely on volunteers without a clear business model or operational plan. Others are more successful when supported by public institutions or partnerships with technology providers.\n\nThe passage suggests that the success of urban farming depends not only on agricultural methods but also on governance, planning, and community trust. In the most effective programs, farmers, residents, and policymakers work together to design systems that are productive, sustainable, and socially inclusive.`,
      audioUrl: null,
      transcript: null,
      questionGroups: [
        {
          id: 'g3',
          type: 'sentence_completion',
          instruction: 'Complete the sentences with a word or short phrase from the passage.',
          questions: [
            {
              id: 'q4',
              number: 4,
              text: 'Urban gardens can help residents who have limited access to affordable ________.',
              acceptedAnswers: ['fruit and vegetables', 'fruit and vegetable', 'fruit', 'vegetables'],
              explanation: 'The passage mentions access to affordable fruit and vegetables in neighbourhoods with limited access.'
            },
            {
              id: 'q5',
              number: 5,
              text: 'Some urban farming initiatives fail because they rely on ________ without a clear plan.',
              acceptedAnswers: ['volunteers'],
              explanation: 'The passage explicitly states that some projects fail because they rely on volunteers without a clear business model or operational plan.'
            }
          ]
        }
      ]
    },
    {
      id: 'part-3',
      title: 'Part 3',
      passage: `Urban farming is a concept that intersects with design, policy, and ecology. In dense cities, planners often look for ways to integrate food production into buildings, parks, and transport corridors. The challenge is to avoid creating systems that are technically impressive but socially disconnected. When well-designed, these spaces can become educational hubs, cultural sites, and sources of environmental benefit.\n\nA final point is that urban farming cannot be treated as a standalone solution. It must be part of a broader strategy that includes public health, housing, education, and climate adaptation. Without that wider context, the benefits may be short-lived or unevenly shared.`,
      audioUrl: null,
      transcript: null,
      questionGroups: [
        {
          id: 'g4',
          type: 'multiple_choice_multiple',
          instruction: 'Choose all answers that are correct.',
          options: ['A. It should be part of a larger policy agenda.', 'B. It is only useful when it is profitable.', 'C. It can function as an educational space.', 'D. It works without any community input.'],
          questions: [
            {
              id: 'q6',
              number: 6,
              text: 'Which statements reflect the writer’s view of urban farming?',
              acceptedAnswers: ['a', 'c'],
              explanation: 'The passage argues that urban farming should be part of a larger strategy and can become an educational hub.'
            }
          ]
        },
        {
          id: 'g5',
          type: 'short_answer',
          instruction: 'Answer in one or two words.',
          questions: [
            {
              id: 'q7',
              number: 7,
              text: 'What is one major challenge mentioned in relation to urban farming?',
              acceptedAnswers: ['space', 'water usage', 'funding', 'finance', 'soil contamination'],
              explanation: 'The passage names space, water usage, and contamination as important constraints in urban farming.'
            },
            {
              id: 'q8',
              number: 8,
              text: 'What broader area does the passage say urban farming must connect with?',
              acceptedAnswers: ['public health', 'climate adaptation', 'housing', 'education'],
              explanation: 'The final paragraph argues that urban farming must be part of a broader strategy involving public health and other city systems.'
            }
          ]
        }
      ]
    }
  ]
};
