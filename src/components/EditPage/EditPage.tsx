import React, { useState, useEffect, useRef } from "react";

import _throttle from "lodash.throttle";

import classnames from "classnames";
import { st, classes } from "./editPage.st.css";

import PreviewIcon from "../icons/Preview";
import PreviewOffIcon from "../icons/PreviewOff";

import ExpandIcon from "../icons/ExpandScreen";
import CompressIcon from "../icons/CompressScreen";

import EditorLayout from "../EditorLayout/EditorLayout";
import { classes as layout } from "../../styles/puma/layout.st.css";

import { Button, Icon, InputText, P, H2, Label } from "@actionishope/shelley";
import BlockEditor from "../BlockEditor/BlockEditor";
import MetaDataEditor from "../MetaDataEditor/MetaDataEditor";
import Preview from "../Preview/Preview";
import Actions, { statusOptions } from "../Actions/Actions";
import ContentArea from "../ContentArea/ContentArea";
import ContentActions from "../ContentActions/ContentActions";

const EditPreview = () => {
  /** Refs */
  const preview = useRef<HTMLDivElement>(null);
  const previewModes = useRef<HTMLDivElement>(null);
  const previewActions = useRef<HTMLDivElement>(null);
  const fullScreenButton = useRef<HTMLButtonElement>(null);
  const previewButton = useRef<HTMLButtonElement>(null);

  /** States */
  const [focusMode, setPreviewHidden] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<number>(1);
  const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
  const [reviewRequired, setReviewRequired] = useState(true);
  const [status, setStatus] = useState<statusOptions>("draft");
  const [sliderScrolled, setSliderScrolled] = useState(false);

  return (
    // change name... EditorLayout probably
    <EditorLayout
      gridMode={
        fullScreenMode ? "fullScreenMode" : focusMode ? "focusMode" : false
      }
    >
      <ContentArea
        className={layout.content}
        onScrolled={(status: boolean) => setSliderScrolled(status)}
        focusOnProps={{
          enabled: focusMode,
          onEscapeKey: () => setPreviewHidden(false),
          shards: [previewButton]
        }}
      >
        <MetaDataEditor
          data-testid="meta-data"
          titleProps={{
            id: "title",
            label: "Meta title",
            onChange: () => console.log("hi")
          }}
          descriptionProps={{ id: "metaDesc", label: "Meta Description" }}
          mini={sliderScrolled}
          mediaUploader={
            <img
              src="https://ucarecdn.com/68d4e740-b645-4273-bf86-5752a208a6ce/-/crop/3863x2172/0,396/-/preview/-/format/auto/"
              alt=""
            />
          }
        >
          <div>
            <InputText
              id="metaUrl"
              labelVisuallyHidden
              // placeholder="Select a URL"
              placeholder="Define the page URL"
              label={"Page URL"}
              type="text"
              vol={1}
              // startAdornment={
              //   <Icon alt="Select action">
              //     <path d="M8 12l-6.32-6.32 1.67-1.68 4.65 4.65 4.65-4.65 1.67 1.68-6.32 6.32z"></path>
              //   </Icon>
              // }
            />
            <InputText
              id="metaTags"
              labelVisuallyHidden
              placeholder="Select associated tags"
              label={"Tags"}
              type="text"
              vol={1}
            />
          </div>
        </MetaDataEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        <BlockEditor
          settingsRender={() => (
            <P>Select taxonomies to display in this listing.</P>
          )}
          shards={[preview, previewModes]}
          data-testid="test"
        >
          <Label>Page Title</Label>
          <InputText
            id="ptitle2"
            labelVisuallyHidden
            placeholder="Title"
            label={"Page title"}
            type="text"
            vol={6}
          />
        </BlockEditor>

        {/* <div className={classes.contentActions}>
          <Button vol={4}>Add content block</Button>
        </div> */}

        <ContentActions>
          <Button vol={4}>Add content block</Button>
        </ContentActions>
      </ContentArea>

      <div className={layout.previewActions} ref={previewActions}>
        <Button
          onClick={() => setPreviewHidden(!focusMode)}
          variant={2}
          vol={5}
          ref={previewButton}
          className={layout.togglePreviewButton}
          icon={
            focusMode ? (
              <PreviewOffIcon alt="Toggle preview on" />
            ) : (
              <PreviewIcon alt="Toggle preview off" />
            )
          }
        />
        <Button
          variant={2}
          vol={5}
          ref={fullScreenButton}
          className={layout.toggleFullScreenButton}
          onClick={() => setFullScreenMode(!fullScreenMode)}
          // icon={<ExpandIcon alt="Toggle full screen on" />}
          icon={
            !fullScreenMode ? (
              <ExpandIcon alt="Toggle full screen on" />
            ) : (
              <CompressIcon alt="Toggle full screen off" />
            )
          }
        />
      </div>

      <Preview
        className={layout.preview}
        previewMode={previewMode}
        ref={preview}
        onModeChange={setPreviewMode}
        previewModesRef={previewModes}
        focusOnProps={{
          enabled: fullScreenMode,
          onEscapeKey: () => setFullScreenMode(false),
          shards: [previewModes, fullScreenButton]
        }}
      >
        <div className={classnames(classes.appWrap, "iframe")}>
          <H2 vol={6}>Block1</H2>
          <P>Block2</P>
          <P>Block3</P>
          <P>Block3</P>
          <P>Block3</P>
          <H2 vol={6}>Block1</H2>
          <P>Block3</P>
          <P>Block3</P>
          <P>Block3</P>
          <H2 vol={6}>Block1</H2>
          <P>Block3</P>
          <P>Block3</P>
          <P>Block3</P>
        </div>
      </Preview>
      {/* <div className={layout.actions}>hi</div> */}
      <Actions
        className={layout.actions}
        status={status}
        lastSaved="5 mins ago"
        reviewRequired={reviewRequired}
        onDelete={() => console.log("delete")}
        onUnPublish={() => setStatus("unpublished")}
        onReview={() => {
          setReviewRequired(false);
          setStatus("updated");
        }}
        onPublish={() => setStatus("published")}
        // onArchive={() => console.log("archived")}
        // onUnArchive={() => {console.log("unarchived")}
      />
    </EditorLayout>
  );
};

export default EditPreview;
