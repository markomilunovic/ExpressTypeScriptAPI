interface TodoCreateRequestBody {
    title: string;
    description: string;
};

interface TodoUpdateRequestBody {
    title?: string;
    description?: string;
    status?: 'pending' | 'completed'; 
};

interface TodoItem {
    id: number;
    title: string;
    description: string;
    status?: 'pending' | 'completed'; 
    imagePath?: string
};

export type{
    TodoCreateRequestBody,
    TodoUpdateRequestBody,
    TodoItem
};