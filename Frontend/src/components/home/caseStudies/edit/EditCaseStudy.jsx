import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, X } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMutation from "@/hooks/useMutation";
import uploadFiles from "@/hooks/uploadFiles";
import { CASE_STUDY } from "@/imports/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showToast } from "@/utils/toast";
import useQuery from "@/hooks/useQuery";
import TemplatePreview from "../../template/preview/TemplatePreview";

function EditCaseStudy() {
    const {state}=useLocation()
    const caseStudy=state?.caseStudy
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const [toolsUsed, setToolsUsed] = useState([]);
  const [newTool, setNewTool] = useState("");
  const [outcomes, setOutcomes] = useState([]);
  const [newOutcome, setNewOutcome] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [themeId, setThemeId] = useState("");
  const { mutate, loading } = useMutation();
  const [caseStudyData, setCaseStudyData] = useState(caseStudy);
  const [mediaUrls, setMediaUrls] = useState(caseStudy?.mediaUrls || []);

  useEffect(() => {
    if (caseStudy) {
      reset({
        title: caseStudy.title,
        overview: caseStudy.overview,
        startTime: caseStudy.startTime?.split('T')[0],
        endTime: caseStudy.endTime?.split('T')[0],
        youTubeUrl: caseStudy.youTubeUrl,
      });
      setToolsUsed(caseStudy.toolsUsed || []);
      setOutcomes(caseStudy.outcomes || []);
      setThemeId(caseStudy.themeId || "1");
    }
  }, [ reset]);

  const handleToolAdd = () => {
    if (newTool.trim()) {
      setToolsUsed([...toolsUsed, newTool.trim()]);
      setNewTool("");
    }
  };

  const handleToolRemove = (index) => {
    setToolsUsed(toolsUsed.filter((_, i) => i !== index));
  };

  const handleOutcomeAdd = () => {
    if (newOutcome.trim()) {
      setOutcomes([...outcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const handleOutcomeRemove = (index) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleThemeChange = (value) => {
    setThemeId(value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };
  const removeMedia = (index) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handlePreview = () => {
    const currentData = watch();

    setCaseStudyData({
      ...caseStudy,
      ...currentData,
      toolsUsed,
      outcomes,
      themeId,
    });
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      toolsUsed,
      outcomes,
      themeId,
      mediaUrls,
    };

    if (!themeId) {
      showToast.warn("Theme ID is required");
      return;
    }

    if (!formData.title) {
      showToast.warn("Title is required");
      return;
    }

    if (!formData.overview) {
      showToast.warn("Overview is required");
      return;
    }

    if (!formData.startTime) {
      showToast.warn("Start Time is required");
      return;
    }

    if (!formData.endTime) {
      showToast.warn("End Time is required");
      return;
    }

    if (selectedFiles.length) {
      const fileResults = await uploadFiles(selectedFiles);
      if (fileResults?.length) {
        formData.mediaUrls = [...formData.mediaUrls, ...fileResults];
      }
    }

    const response = await mutate({
      url: `${CASE_STUDY}/${caseStudy.id}`,
      method: "PUT",
      data: formData,
    });

    if (response?.success) {
      navigate(-1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center mb-2">
            Edit Case Study
          </h1>
          <p className="text-muted-foreground text-center">
            Update your case study details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1  gap-8">
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
                  placeholder="Provide a brief overview"
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
              <div className="space-y-2">
                <Label className="pt-2">Existing Images</Label>
              </div>
             
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {mediaUrls.map((file, index) => (
                                    <div
                                      key={index}
                                      className="relative group aspect-video bg-muted rounded-lg overflow-hidden"
                                    >
                                      <img
                                        src={file}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeMedia(index)}
                                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
              <div className="space-y-2">
                <Label htmlFor="media">Media Files</Label>
                <Input
                  id="media"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
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

            <div className="space-y-6">
              {/* Tools Used */}
              <div className="space-y-4">
                <Label>Tools Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    placeholder="Add a tool"
                  />
                  <Button type="button" onClick={handleToolAdd}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {toolsUsed.map((tool, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        onClick={() => handleToolRemove(index)}
                        className="text-secondary-foreground/50 hover:text-secondary-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
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
                  />
                  <Button type="button" onClick={handleOutcomeAdd}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-secondary p-3 rounded-lg"
                    >
                      <span>{outcome}</span>
                      <button
                        type="button"
                        onClick={() => handleOutcomeRemove(index)}
                        className="text-secondary-foreground/50 hover:text-secondary-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Theme ID</Label>
                <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={themeId || ""}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="">Select theme</option>
              {[{key:"Minimal",value:"1"},{key:"Modern",value:"2"},{key:"Creative",value:"3"}].map((theme)=>(
                          <option key={theme.value} value={theme.value}>{theme.key}</option>
                        ))}
          </select>
              
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button loading={loading} type="submit" className="w-8/12">
              Update Case Study
            </Button>
            <Button loading={loading} type="button" onClick={handlePreview} className="w-2/12 bg-green-500">
             <Eye className="h-4 w-4" /> Preivew
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
        <div>
            <TemplatePreview preivewId={caseStudyData?.themeId??"1"} caseStudy={caseStudyData}/>
        </div>
      </div>
    </div>
  );
}

export default EditCaseStudy;