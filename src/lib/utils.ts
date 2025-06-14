import dayjs from 'dayjs';

export const dateFormater = (timestamp: string) => {
    return (
        dayjs(timestamp).format(
            'dddd, DD MMMM YYYY'
        )
    )
}

export const transformAnswers = (formData: Record<string, any>) => {
    const answers = Object.entries(formData).map(([key, value]) => {
      const questionId = parseInt(key.replace('question_', ''));
  
      let formattedValue: string;
      if (value instanceof Date) {
        formattedValue = value.toISOString().split('T')[0];
      } else if (Array.isArray(value)) {
        formattedValue = value.join(', ');
      } else {
        formattedValue = value;
      }
  
      return {
        question_id: questionId,
        value: formattedValue,
      };
    });
  
    return { answers };
  }
  