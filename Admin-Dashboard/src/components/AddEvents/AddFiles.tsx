import { FilePlus2 } from "lucide-react";

const AddFiles = () => {
  return (
    <>
      <div className="border border-slate-300 p-4">
        <h1 className="text-3xl font-semibold text-black/50">Add Files</h1>
        <p className="text-start text-lg text-black/50">
          Add files and attachments relevant to your event.
        </p>
        <div className="flex flex-row justify-between mt-5 items-center">
          <div>
            <p className="text-lg text-customBlue">Added_file.pddf</p>
          </div>
          <div className="flex items-center gap-3 btn">
            <FilePlus2 size={20} />
            <p>Upload Files</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFiles;
