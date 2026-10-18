import { sampleReadingTest } from '../../data/sampleReadingTest';

export function flattenQuestions(test = sampleReadingTest) {
  return test.sections.flatMap((section) =>
    section.questionGroups.flatMap((group) => group.questions)
  );
}
