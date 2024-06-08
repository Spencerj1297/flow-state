export interface Application {
    company: string;
    response: string;
    applied_via: string;
    email: string;
    connection: string;
    notes: string;
    user_id: string;
  }

  export interface Task {
    title: string;
    description: string;
    status: string;
    user_id: string;
    priority: string;
  }

  export interface Quote {
    quote: string;
  }