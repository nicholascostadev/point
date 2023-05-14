import Image from "next/image";

type CommentProps = {
    user: {
        name: string;
        role: string;
    };
    text: string;
};

export function Comment({ user, text }: CommentProps) {
    return (
        <div className="flex flex-col gap-1 rounded-md border border-gray-200 p-2 dark:border-gray-900">
            <div className="flex items-center justify-start gap-2">
                <Image
                    src="https://github.com/nicholascostadev.png"
                    alt="Profile picture"
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-200 dark:border-gray-900"
                />
                <h5>
                    {user.name} - {user.role}
                </h5>
            </div>
            <p>{text}</p>
        </div>
    );
}
