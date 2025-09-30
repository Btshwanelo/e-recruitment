import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText } from 'lucide-react';
import { UploadedFile } from '@/types/profile';

interface CVManagementProps {
  cvFile: UploadedFile | null;
  idDocument: UploadedFile | null;
  isUploading: boolean;
  onCvFileUpload: (files: FileList | null) => void;
  onIdDocumentUpload: (files: FileList | null) => void;
  onDeleteCV: () => void;
  onDeleteIdDocument: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const CVManagement: React.FC<CVManagementProps> = ({
  cvFile,
  idDocument,
  isUploading,
  onCvFileUpload,
  onIdDocumentUpload,
  onDeleteCV,
  onDeleteIdDocument,
  onSubmit,
  isLoading,
}) => {
  const [activeDocTab, setActiveDocTab] = useState<string>('cv');
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const idDocumentInputRef = useRef<HTMLInputElement>(null);

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, isCV: boolean = false) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (isCV) {
      onCvFileUpload(files);
    } else {
      onIdDocumentUpload(files);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-white border-none rounded-lg shadow-none">
      <CardContent className="pt-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Manage Documents</h2>
        <p className="text-gray-500 text-sm mb-6">
          Upload your CV and ID document. These documents will be attached to your job applications.
        </p>

        <Tabs defaultValue="cv" className="w-full mb-6">
          <TabsList className="grid w-fit grid-cols-2 bg-white shadow-none text-[#026AA2]">
            <TabsTrigger
              value="cv"
              onClick={() => setActiveDocTab('cv')}
              className={activeDocTab === 'cv' ? 'text-[#026AA2] font-semibold shadow-none bg-[#F0F9FF]' : ''}
            >
              CV Document
            </TabsTrigger>
            <TabsTrigger
              value="id-document"
              onClick={() => setActiveDocTab('id-document')}
              className={activeDocTab === 'id-document' ? 'text-[#026AA2] font-semibold shadow-none bg-[#F0F9FF]' : ''}
            >
              ID Document
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cv" className="mt-6">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#005f33] transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, true)}
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className={`h-12 w-12 mb-4 ${isUploading ? 'text-[#005f33] animate-pulse' : 'text-gray-400'}`} />
                <h3 className="text-lg font-medium mb-2">{isUploading ? 'Uploading...' : 'Upload CV'}</h3>
                <p className="text-sm text-gray-500 mb-4">Drag and drop your CV file here, or click to browse</p>
                <p className="text-xs text-gray-400 mb-4">Supported formats: PDF, DOC, DOCX (Max size: 5MB)</p>
                <Button
                  onClick={() => cvFileInputRef.current?.click()}
                  className="bg-[#005f33] hover:bg-[#005f33]"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Browse Files'}
                </Button>
                <input
                  ref={cvFileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => onCvFileUpload(e.target.files)}
                />
              </div>
            </div>

            {cvFile && (
              <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-[#005f33]" />
                    <div>
                      <p className="font-medium">{cvFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(cvFile.size)} • Uploaded on {new Date(cvFile.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={onDeleteCV}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="id-document" className="mt-6">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#005f33] transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, false)}
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className={`h-12 w-12 mb-4 ${isUploading ? 'text-[#005f33] animate-pulse' : 'text-gray-400'}`} />
                <h3 className="text-lg font-medium mb-2">{isUploading ? 'Uploading...' : 'Upload ID Document'}</h3>
                <p className="text-sm text-gray-500 mb-4">Drag and drop your ID document here, or click to browse</p>
                <p className="text-xs text-gray-400 mb-4">Supported formats: PDF, JPG, PNG (Max size: 10MB)</p>
                <Button
                  onClick={() => idDocumentInputRef.current?.click()}
                  className="bg-[#005f33] hover:bg-[#005f33]"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Browse Files'}
                </Button>
                <input
                  ref={idDocumentInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => onIdDocumentUpload(e.target.files)}
                />
              </div>
            </div>

            {idDocument && (
              <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-[#005f33]" />
                    <div>
                      <p className="font-medium">{idDocument.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(idDocument.size)} • Uploaded on {new Date(idDocument.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={onDeleteIdDocument}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
          <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-[#005f33] w-[180px] hover:bg-[#005f33] disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save CV & Complete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVManagement;
