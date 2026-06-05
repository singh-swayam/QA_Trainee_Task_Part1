export type UserType = 'standard' | 'locked' | 'problem' | 'performance_glitch' | 'error' | 'visual';

export interface UserCredentials {
    username: string;
    password: string;
    type: UserType;
}

export const users: UserCredentials[] = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        type: 'standard'
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        type: 'locked'
    },
    {
        username: 'problem_user',
        password: 'secret_sauce',
        type: 'problem'
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        type: 'performance_glitch'
    },
    {
        username: 'error_user',
        password: 'secret_sauce',
        type: 'error'
    },
    {
        username: 'visual_user',
        password: 'secret_sauce',
        type: 'visual'
    }
]