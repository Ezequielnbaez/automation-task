import WorkflowList from "@/app/(main)/(routes)/dashboard/workflows/editor/[editorId]/_components/workflowList";
import WorkflowButton from "@/app/(main)/(routes)/dashboard/workflows/editor/[editorId]/_components/workflowbutton";
const WorkflowPage = () => {

  return (
    <div className="h-screen w-full flex mt-10">
      <div className="h-full w-full justify-center flex ">
       <WorkflowList/>
      </div>
      <div className="flex ml-auto m-10 justify-end">
        <WorkflowButton credits={"ho"} />
      </div>
    </div>
  );
};

export default WorkflowPage;
