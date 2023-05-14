import { Comment } from "./comment";

export function CommentSection() {
    return (
        <div className="space-y-2">
            <h3 className="text-xl">Comments</h3>

            <div className="flex flex-col gap-2">
                <Comment
                    user={{
                        name: "Nicholas Costa",
                        role: "Developer",
                    }}
                    text="This project is currently not possible for our team to pick up, so we are closing it up, sorry, feel free to delete this project and request another one."
                />
            </div>
        </div>
    );
}
