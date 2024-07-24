import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) {
    return (
      <div className="flex-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 w-full max-w-5xl">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <p className="h3-bold md:h2-bold text-left w-full">Create Post</p>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
