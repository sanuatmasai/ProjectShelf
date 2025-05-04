import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMutation from "@/hooks/useMutation";
import uploadFiles from "@/hooks/uploadFiles";
import { CASE_STUDY } from "@/imports/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showToast } from "@/utils/toast";

// Ensure all shadcn/ui components are properly imported

function CreateCaseStudies() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [toolsUsed, setToolsUsed] = useState([]);
  const [newTool, setNewTool] = useState("");
  const [outcomes, setOutcomes] = useState([]);
  const [newOutcome, setNewOutcome] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [themeId, setThemeId] = useState("");
  const { mutate, loading } = useMutation();

  const handleToolAdd = () => {
    if (newTool.trim()) {
      setToolsUsed([...toolsUsed, newTool.trim()]);
      setNewTool("");
    }
  };

  const handleOutcomeAdd = () => {
    if (newOutcome.trim()) {
      setOutcomes([...outcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const removeTool = (index) => {
    setToolsUsed(toolsUsed.filter((_, i) => i !== index));
  };

  const removeOutcome = (index) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleThemeChange = (value) => {
    setThemeId(value);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      toolsUsed,
      outcomes,
      themeId,
    };
    if(!themeId){
      showToast.warn("Theme ID is required");
      return;
    }
    if(!selectedFiles.length){
      showToast.warn("Please select at least one file");
      return;
    }
    if(!formData.title){
      showToast.warn("Title is required");
      return;
    }
    if(!formData.overview){
      showToast.warn("Overview is required");
      return;
    }
    if(!formData.startTime){
      showToast.warn("Start Time is required");
      return;
    }
    if(!formData.endTime){
      showToast.warn("End Time is required");
      return;
    }
    const fileResults = await uploadFiles(selectedFiles);
    if (fileResults?.length) {
      formData.mediaUrls = fileResults;
      const response = await mutate({
        url: CASE_STUDY,
        method: "POST",
        data: formData,
      });
      if (response?.success) {
        navigate(-1);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center mb-2">
            Create Case Study
          </h1>
          <p className="text-muted-foreground text-center">
            Showcase your work by creating a detailed case study
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter case study title"
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <Label htmlFor="overview">Overview</Label>
              <Textarea
                id="overview"
                {...register("overview", { required: "Overview is required" })}
                placeholder="Provide a detailed overview of your case study"
                className="min-h-[150px]"
              />
              {errors.overview && (
                <p className="text-sm text-destructive">
                  {errors.overview.message}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Date</Label>
                <Input
                  id="startTime"
                  type="date"
                  {...register("startTime", {
                    required: "Start date is required",
                  })}
                />
                {errors.startTime && (
                  <p className="text-sm text-destructive">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Date</Label>
                <Input
                  id="endTime"
                  type="date"
                  {...register("endTime", { required: "End date is required" })}
                />
                {errors.endTime && (
                  <p className="text-sm text-destructive">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tools Used */}
            <div className="space-y-4">
              <Label>Tools Used</Label>
              <div className="flex gap-2">
                <Input
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="Add a tool"
                  className="flex-1"
                />
                <Button type="button" onClick={handleToolAdd}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {toolsUsed.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{tool}</span>
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube URL */}
            <div className="space-y-2">
              <Label htmlFor="youTubeUrl">YouTube URL (Optional)</Label>
              <Input
                id="youTubeUrl"
                {...register("youTubeUrl")}
                placeholder="Enter YouTube video URL"
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <Label>Media</Label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="mb-4"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative group aspect-video bg-muted rounded-lg overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-4">
              <Label>Outcomes</Label>
              <div className="flex gap-2">
                <Input
                  value={newOutcome}
                  onChange={(e) => setNewOutcome(e.target.value)}
                  placeholder="Add an outcome"
                  className="flex-1"
                />
                <Button type="button" onClick={handleOutcomeAdd}>
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <span>{outcome}</span>
                    <button
                      type="button"
                      onClick={() => removeOutcome(index)}
                      className="hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
        <Label>Theme ID</Label>
        <Select value={themeId} onValueChange={(value)=>handleThemeChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Theme" />

          </SelectTrigger>
          <SelectContent>
            {[{key:"Minimal",value:"1"},{key:"Modern",value:"2"},{key:"Creative",value:"3"}].map((theme)=>(
              <SelectItem key={theme.value} value={theme.value}>{theme.key}</SelectItem>
            ))}
           
          </SelectContent>
        </Select>
      </div>

            </div>
          </div>

          <div className="flex justify-between">
            <Button loading={loading} type="submit" className="w-10/12">
              Create Case Study
            </Button>
            <Button
              onClick={() => navigate(-1)}
              type="button"
              className="w-1.5/12 bg-gray-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCaseStudies;
