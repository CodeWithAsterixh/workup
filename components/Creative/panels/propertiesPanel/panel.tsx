"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppearanceControls from "./controls/AppearanceControls";
import BorderControls from "./controls/BorderControls";
import LayoutControls from "./controls/LayoutControls";
import TypographyControls from "./controls/TypographyControls";
import { useEditorStore } from "@/store/Editor";
import QrControls from "./controls/QrControls";

export default function PropertiesPanelMain() {
  const { selectedIds, currentFace } = useEditorStore();
  return (
    <Tabs defaultValue="elements" className="flex flex-col gap-6">
      <TabsList className="w-full overflow-x-auto flex !justify-start">
        <TabsTrigger value="elements">Elements</TabsTrigger>
        <TabsTrigger value="main-face">Main face</TabsTrigger>
      </TabsList>
      <TabsContent value="elements" className="flex flex-col gap-6">
        {selectedIds.length > 0 ? (
          <>
            <LayoutControls tab="element" />
            <TypographyControls />
            <AppearanceControls tab="element" />
            <BorderControls tab="element" />
            <QrControls/>
          </>
        ) : (
          <div className="w-full h-fit py-10 flex items-center justify-center">
            <p>No element found, please select an element on the canvas</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="main-face" className="flex flex-col gap-6">
        {currentFace? (
          <>
            <LayoutControls tab="face" />
            <AppearanceControls tab="face" />
            <BorderControls tab="face" />
          </>
        ) : (
          <div className="w-full h-fit py-10 flex items-center justify-center">
            <p>No Face found, please select a Face on the canvas</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
