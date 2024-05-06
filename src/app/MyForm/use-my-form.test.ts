import type {MyFormType} from '@/app/MyForm/use-my-form';
import {myFormSchema} from '@/app/MyForm/use-my-form';

describe('use-my-form', () => {
  const validateFormData = (formData: MyFormType): boolean => {
    const isValid = myFormSchema.isValidSync(formData);
    console.log('isValid:', isValid);
    return isValid;
  };

  test('validate: timeTraveler', () => {
    const testData: MyFormType = {
      name: 'test',
      participantType: 'timeTraveler',
      year: 2025,
    };

    expect(validateFormData(testData)).toBeTruthy();
  });

  test('validate: alien', () => {
    const testData: MyFormType = {
      name: 'test',
      participantType: 'alien',
      planetName: '木星',
    };

    expect(validateFormData(testData)).toBeTruthy();
  });
});
