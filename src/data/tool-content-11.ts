import type { ToolContent } from './tool-content'

export const toolContent11: Record<string, ToolContent> = {
  'bmi-calculator': {
    whatIs: {
      heading: 'What Is BMI (Body Mass Index)?',
      body: "Body Mass Index (BMI) is a numerical value calculated from a person's height and weight. Developed by Belgian mathematician Adolphe Quetelet in the 1830s, BMI is used as a screening tool to categorize individuals into weight status groups: Underweight (below 18.5), Normal weight (18.5–24.9), Overweight (25.0–29.9), and Obese (30.0 and above). The World Health Organization (WHO) and most health organizations use these thresholds for population-level health assessments.\n\nBMI is calculated by dividing weight in kilograms by height in meters squared (kg/m²). While BMI is a useful and widely accepted screening metric, it has notable limitations. It does not distinguish between muscle mass and fat mass, meaning muscular athletes may be classified as overweight despite having low body fat. It also does not account for fat distribution, bone density, age, sex, or ethnicity, all of which influence health risk. BMI should be considered alongside other measurements such as waist circumference, body fat percentage, and clinical assessments for a complete health picture.",
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Health Screening',
          description:
            'Quickly assess whether your weight falls within a healthy range for your height as a first step in evaluating overall health status.',
        },
        {
          title: 'Fitness Goals',
          description:
            'Track changes in your BMI over time as you work toward weight loss, muscle gain, or general fitness improvement targets.',
        },
        {
          title: 'Medical Assessments',
          description:
            'Healthcare providers use BMI as part of routine checkups to identify patients who may benefit from further evaluation or lifestyle changes.',
        },
        {
          title: 'Health Insurance',
          description:
            'Some insurance providers reference BMI categories when determining premiums or eligibility for certain health and life insurance policies.',
        },
      ],
    },
    tips: {
      heading: 'BMI Calculation Tips',
      items: [
        {
          title: 'Measure Accurately',
          description:
            'Use a reliable scale and measure height without shoes for the most accurate BMI calculation. Small errors in height have a large impact on the result.',
        },
        {
          title: 'Consider Body Composition',
          description:
            'BMI does not measure body fat directly. Athletes and people with high muscle mass may have a high BMI but low body fat percentage.',
        },
        {
          title: 'Use It as a Starting Point',
          description:
            'Combine BMI with waist circumference, body fat percentage, and blood pressure readings for a more complete picture of your health.',
        },
        {
          title: 'Check Regularly',
          description:
            'Track your BMI periodically rather than daily. Monthly or quarterly measurements provide a clearer picture of long-term trends.',
        },
      ],
    },
    comparison: {
      heading: 'BMI Categories (WHO Classification)',
      headers: ['Category', 'BMI Range', 'Health Risk', 'Typical Action'],
      rows: [
        ['Underweight', '< 18.5', 'Nutritional deficiency, weakened immunity', 'Consult a dietitian for weight gain plan'],
        ['Normal', '18.5 – 24.9', 'Lowest overall health risk', 'Maintain current healthy lifestyle'],
        ['Overweight', '25.0 – 29.9', 'Increased risk of heart disease, diabetes', 'Consider diet and exercise adjustments'],
        ['Obese', '>= 30.0', 'High risk of chronic diseases', 'Seek medical guidance for weight management'],
      ],
    },
  },
}
