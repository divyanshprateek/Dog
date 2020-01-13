export interface AuthResponse {
    status: any;
    token: string;
    success: boolean;
    user: {
      id: number;
      name: string;
      email: string;
      token: string;
      contactNum: string;
      expires_in: number;
      success: boolean;
    };
  }
  