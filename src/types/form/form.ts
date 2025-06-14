export type TFormCreateRequest = {
  name: string
  slug: string
  allowed_domains: string[]
  description?: string
  limit_one_response: boolean
}

export type TFormsResponse = {
    id: number
    name: string
    slug: string
    description: string
    limit_one_response: boolean
    creator_id: number
}

export type TFormDetails = {
  id: number
  name: string
  slug: string
  description: string
  limit_one_response: boolean
  creator_id: number
  allowed_domains: string[]
  questions: TQuestion[]
}

type TBaseQuestion = {
  id: number;
  form_id: number;
  name: string;
  is_required: boolean;
};

export type TChoiceType = {
  choice_type: 
  | 'short answer'
  | 'paragraph'
  | 'date'
  | 'multiple choice'
  | 'dropdown'
  | 'checkboxes'
};

type ChoiceField = TBaseQuestion & {
  choice_type: 'multiple choice' | 'dropdown' | 'checkboxes';
  choices: string;
};

type NonChoiceField = TBaseQuestion & {
  choice_type: 'short answer' | 'paragraph' | 'date';
  choices: null;
};

export type TQuestion = ChoiceField | NonChoiceField;

export type TAnswer = {
  [key: string]: string | number | boolean;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
};

export type TSubmission = {
  date: string;
  user: TUser;
  answers: TAnswer;
};