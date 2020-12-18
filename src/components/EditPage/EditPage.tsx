import React, { useState, useEffect, useRef } from "react";

import _throttle from "lodash.throttle";

import classnames from "classnames";
import { st, classes } from "./editPage.st.css";

import PreviewIcon from "../icons/Preview";
import PreviewOffIcon from "../icons/PreviewOff";

import ExpandIcon from "../icons/ExpandScreen";
import CompressIcon from "../icons/CompressScreen";
import Dialog from "../Dialog/Dialog";

import { FocusOn } from "react-focus-on";

import Layout from "../Layout/Layout";
import { classes as layout } from "../../styles/puma/layout.st.css";

import {
  Button,
  InputSelection,
  Icon,
  InputText,
  P,
  H2,
  Label
} from "@actionishope/shelley";
import BlockEditor from "../BlockEditor/BlockEditor";
import PreviewModes from "../PreviewModes/PreviewModes";
import MetaDataEditor from "../MetaDataEditor/MetaDataEditor";
import Preview from "../Preview/Preview";
import Actions, { statusOptions } from "../Actions/Actions";

const EditPreview = ({ className: classNameProp, ...rest }: any) => {
  /** Refs */
  const slider = useRef<HTMLDivElement>(null);
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

  useEffect(
    // Figure out where the scroll is going and set the class to position the item.
    () => {
      // setSliderShuntPosition.cancel();
      // TODO: remove listener on unmount...
      slider.current !== null &&
        slider.current.addEventListener("scroll", () => {
          if (slider.current !== null) {
            if (slider.current.scrollTop > 10) {
              setSliderScrolled(true);
            } else if (slider.current.scrollTop < 100) {
              // setSliderScrolled(false);
            }
          }
        });
    },
    [sliderScrolled]
  );

  return (
    // <DefaultLayout>
    <div>
      <div className={st(classnames(classes.root, classNameProp))}>
        <header className={classes.header}>Meuu</header>
        {/* <Layout gridMode={fullScreenMode ? "previewFullScreen" : "default"}> */}
        <Layout
          gridMode={
            fullScreenMode ? "fullScreenMode" : focusMode ? "focusMode" : false
          }
        >
          <FocusOn
            className={layout.content}
            enabled={focusMode}
            // onClickOutside={callback}
            onEscapeKey={() => setPreviewHidden(false)}
            shards={[previewButton]}
          >
            <div className={classnames(classes.scroll)} ref={slider}>
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
                    label={"Meta description"}
                    type="text"
                    vol={1}
                    startAdornment={
                      <Icon alt="Select action">
                        <path d="M8 12l-6.32-6.32 1.67-1.68 4.65 4.65 4.65-4.65 1.67 1.68-6.32 6.32z"></path>
                      </Icon>
                    }
                  />
                  <InputText
                    id="metaTags"
                    labelVisuallyHidden
                    placeholder="Select associated tags"
                    label={"Meta description"}
                    type="text"
                    vol={1}
                  />
                </div>
              </MetaDataEditor>

              <BlockEditor
                settingsRender={() => (
                  <P className={classes.helpText}>
                    Select taxonomies to display in this listing.
                  </P>
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
            </div>
          </FocusOn>

          {/* <div className={layout.previewVisibility}>
            <InputSelection
              id="preview"
              inputPos="bottom"
              label={
                <Icon viewBox="0 0 24 24" style={{ fontSize: ".9rem" }}>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </Icon>
              }
              type="toggle"
              vol={1}
            />
          </div> */}

          {/* <PreviewModes
            className={layout.previewModes}
            setPreviewMode={setPreviewMode}
            previewMode={previewMode}
            ref={previewModes}
          /> */}

          <div className={layout.previewFullScreen} ref={previewActions}>
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

          <FocusOn
            className={layout.preview}
            enabled={fullScreenMode}
            // onClickOutside={callback}
            onEscapeKey={() => setFullScreenMode(false)}
            shards={[previewModes, fullScreenButton]}
          >
            <PreviewModes
              className={layout.previewModes}
              setPreviewMode={setPreviewMode}
              previewMode={previewMode}
              ref={previewModes}
            />
            <Preview
              // className={layout.preview}
              previewMode={previewMode}
              ref={preview}
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
          </FocusOn>
          <Actions
            className={layout.actions}
            status={status}
            lastSaved="5 mins ago"
            reviewRequired={reviewRequired}
            onDelete={() => console.log("delete")}
            onUnPublish={() => setStatus("unpublished")}
            onReview={() => {
              setReviewRequired(false);
              setStatus("changed");
            }}
            onPublish={() => setStatus("published")}
            // onArchive={() => console.log("archived")}
            // onUnArchive={() => {console.log("unarchived")}
          />
        </Layout>
      </div>
    </div>
    // </DefaultLayout>
  );
};

export default EditPreview;
