import React, { useState, useEffect, useRef } from "react";

import _throttle from "lodash.throttle";

import classnames from "classnames";
import { st, classes } from "./editPreview.st.css";

import {
  Button,
  InputSelection,
  Icon,
  InputText,
  Grid,
  ButtonGroup,
  P,
  H2,
  Label
} from "@actionishope/shelley";
import BlockEditor from "../BlockEditor/BlockEditor";

const EditPreview = ({ className: classNameProp, ...rest }: any) => {
  const slider = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const previewModes = useRef<HTMLDivElement>(null);

  const [sliderScrolled, setSliderScrolled] = useState(false);

  useEffect(
    // Figure out where the scroll is going and set the class to position the item.
    () => {
      // TODO: remove listener on unmount...
      slider.current !== null &&
        slider.current.addEventListener("scroll", () => {
          slider.current !== null &&
            slider.current.scrollTop > 10 &&
            setSliderScrolled(true);
          // if (slider.current !== null) {
          //   if (slider.current.scrollTop > 10) {
          //     setSliderScrolled(true);
          //   } else if (slider.current.scrollTop < 100) {
          //     setSliderScrolled(false);
          //   }
          // }
        });
    },
    [sliderScrolled]
  );

  const settingsRender = () => (
    <P color="textSecondary" className={classes.helpText}>
      Select taxonomies to display in this listing.
    </P>
  );

  return (
    // <DefaultLayout>
    <div>
      <div className={st(classnames(classes.root, classNameProp))}>
        <header className={classes.header}>Meuu</header>
        <div className={classes.internalGrid}>
          <div className={classes.content}>
            <div
              className={classnames(classes.scroll, {
                [classes.metaBlockMini]: sliderScrolled
              })}
              ref={slider}
            >
              <div
                className={classnames(classes.contentBlock, classes.metaBlock, {
                  // [classes.metaBlockMini]: sliderScrolled
                })}
              >
                {/* <Label>Meta data</Label> */}
                <Grid variant={2} className={classes.metaGrid}>
                  <div className={classes.tdi}>
                    <img
                      src="https://ucarecdn.com/68d4e740-b645-4273-bf86-5752a208a6ce/-/crop/3863x2172/0,396/-/preview/-/format/auto/"
                      alt=""
                    />
                    <div>
                      <InputText
                        id="metaTitle"
                        labelVisuallyHidden
                        placeholder="Meta title"
                        label={"Meta title"}
                        type="text"
                        vol={1}
                      />
                      <InputText
                        id="metaDesc"
                        labelVisuallyHidden
                        placeholder="Meta description"
                        label={"Meta description"}
                        type="text"
                        rows={1}
                        vol={1}
                      />
                      {/* <P vol={2}>Meta Title</P>
                      <P vol={2}>Meta Description</P> */}
                    </div>
                  </div>
                  <div>
                    <InputText
                      id="metaDesc"
                      labelVisuallyHidden
                      placeholder="Select a URL"
                      label={"Meta description"}
                      type="text"
                      // rows={2}
                      vol={1}
                    />
                    <InputText
                      id="metaDesc"
                      labelVisuallyHidden
                      placeholder="Select associated tags"
                      label={"Meta description"}
                      type="text"
                      // rows={2}
                      vol={1}
                    />
                  </div>
                </Grid>
              </div>
              {/* <div className={classes.spacer} /> */}
              <BlockEditor
                settingsRender={settingsRender}
                shards={[preview, previewModes]}
                data-test-id="test"
              >
                <Label>Page Title</Label>
                <InputText
                  id="ptitle"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={6}
                />
              </BlockEditor>
              <BlockEditor
                settingsRender={settingsRender}
                shards={[preview, previewModes]}
                data-test-id="test"
              >
                <Label>Page Title</Label>
                <InputText
                  id="ptitle"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={6}
                />
              </BlockEditor>
              <BlockEditor
                settingsRender={settingsRender}
                shards={[preview, previewModes]}
                data-test-id="test"
              >
                <Label>Banner</Label>
                <InputText
                  id="btitle"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={6}
                />
                <InputText
                  id="bdesc"
                  labelVisuallyHidden
                  placeholder="Description"
                  label={"Page title"}
                  type="textarea"
                  // rows={}
                  vol={4}
                />
              </BlockEditor>

              <BlockEditor
                settingsRender={settingsRender}
                shards={[preview, previewModes]}
                data-test-id="test"
              >
                <Label>Body copy</Label>
                <InputText
                  id="body1"
                  labelVisuallyHidden
                  placeholder="Content"
                  label={"Page title"}
                  type="textarea"
                  rows={3}
                  vol={3}
                />
                {/* <textarea></textarea> */}
              </BlockEditor>
              <BlockEditor
                settingsRender={settingsRender}
                shards={[preview, previewModes]}
                data-test-id="test"
              >
                <Label>Reference list</Label>
                <InputText
                  id="reftitle"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={5}
                />
                <InputText
                  id="refdecs"
                  labelVisuallyHidden
                  placeholder="Description"
                  label={"Page title"}
                  type="textarea"
                  // rows={}
                  vol={3}
                />
              </BlockEditor>
              <Button fullWidth>Add block</Button>
            </div>
          </div>
          <div className={classes.previewVisibility}>
            <InputSelection
              id="preview"
              inputPos="bottom"
              label={
                <Icon viewBox="0 0 24 24" style={{ fontSize: ".9rem" }}>
                  {/* <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path> */}
                  {/* <path d="M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z"></path> */}
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </Icon>
              }
              // type="textarea"
              // rows={2}

              // touched={true}
              error="You have an error here yo"
              type="toggle"
              // disabled
              vol={1}
            />
            {/* <Button>On</Button> */}
          </div>

          {/* <g id="globe-wire"><path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM14.8 9.5c0 0.5-0.7 0.66-2 1 0.124-0.589 0.206-1.277 0.229-1.98l2.001-0.020c0 0.36-0.080 0.5-0.16 1v0zM1.2 9.5v0c-0.1-0.5-0.15-0.64-0.2-1h2c0.024 0.723 0.106 1.411 0.244 2.079-1.344-0.419-2.044-0.579-2.044-1.079zM1.2 6.5c0-0.5 0.7-0.66 2-1-0.115 0.594-0.187 1.284-0.2 1.989l-2 0.011c0-0.36 0.080-0.5 0.16-1v0zM8.5 5c1.13 0.013 2.226 0.107 3.298 0.277 0.047 0.643 0.165 1.41 0.201 2.199l-3.499 0.025v-2.5zM8.5 4v-2.94c1.17 0.27 2.2 1.47 2.84 3.15-0.836-0.116-1.819-0.192-2.817-0.21zM7.5 1.060v2.94c-1.017 0.015-2.001 0.087-2.968 0.214 0.768-1.684 1.798-2.884 2.968-3.154zM7.5 5v2.5h-3.5c0.031-0.806 0.142-1.571 0.326-2.307 0.932-0.080 2.035-0.177 3.158-0.193zM4 8.5h3.5v2.5c-1.13-0.013-2.226-0.107-3.298-0.277-0.047-0.643-0.165-1.41-0.201-2.199zM7.5 12v2.94c-1.17-0.27-2.2-1.47-2.84-3.15 0.836 0.116 1.819 0.192 2.817 0.21zM8.5 14.94v-2.94c1.017-0.015 2.001-0.087 2.968-0.214-0.768 1.684-1.798 2.884-2.968 3.154zM8.5 11v-2.5h3.5c-0.031 0.806-0.142 1.571-0.326 2.307-0.932 0.080-2.035 0.177-3.158 0.193zM15 7.5h-2c-0.024-0.723-0.106-1.411-0.244-2.079 1.354 0.399 2.014 0.559 2.014 1.079v0c0.13 0.5 0.18 0.64 0.23 1zM14.3 4.91c-0.506-0.204-1.106-0.38-1.726-0.5-0.361-1.019-0.809-1.898-1.389-2.672 1.355 0.726 2.413 1.811 3.067 3.131zM4.84 1.76c-0.568 0.752-1.019 1.631-1.305 2.581-0.699 0.189-1.299 0.365-1.874 0.593 0.751-1.39 1.823-2.475 3.139-3.156zM1.73 11.090c0.506 0.204 1.106 0.38 1.726 0.5 0.361 1.019 0.809 1.898 1.389 2.672-1.367-0.722-2.436-1.807-3.097-3.131zM11.17 14.24c0.564-0.753 1.012-1.631 1.295-2.581 0.699-0.189 1.299-0.365 1.874-0.593-0.751 1.39-1.823 2.475-3.139 3.156z"></path></g>
<g id="globe"><path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM13.2 5.3c0.4 0 0.7 0.3 1.1 0.3-0.3 0.4-1.6 0.4-2-0.1 0.3-0.1 0.5-0.2 0.9-0.2zM1 8c0-0.4 0-0.8 0.1-1.3 0.1 0 0.2 0.1 0.3 0.1 0 0 0.1 0.1 0.1 0.2 0 0.3 0.3 0.5 0.5 0.5 0.8 0.1 1.1 0.8 1.8 1 0.2 0.1 0.1 0.3 0 0.5-0.6 0.8-0.1 1.4 0.4 1.9 0.5 0.4 0.5 0.8 0.6 1.4 0 0.7 0.1 1.5 0.4 2.2-2.5-1.2-4.2-3.6-4.2-6.5zM8 15c-0.7 0-1.5-0.1-2.1-0.3-0.1-0.2-0.1-0.4 0-0.6 0.4-0.8 0.8-1.5 1.3-2.2 0.2-0.2 0.4-0.4 0.4-0.7 0-0.2 0.1-0.5 0.2-0.7 0.3-0.5 0.2-0.8-0.2-0.9-0.8-0.2-1.2-0.9-1.8-1.2s-1.2-0.5-1.7-0.2c-0.2 0.1-0.5 0.2-0.5-0.1 0-0.4-0.5-0.7-0.4-1.1-0.1 0-0.2 0-0.3 0.1s-0.2 0.2-0.4 0.1c-0.2-0.2-0.1-0.4-0.1-0.6 0.1-0.2 0.2-0.3 0.4-0.4 0.4-0.1 0.8-0.1 1 0.4 0.3-0.9 0.9-1.4 1.5-1.8 0 0 0.8-0.7 0.9-0.7s0.2 0.2 0.4 0.3c0.2 0 0.3 0 0.3-0.2 0.1-0.5-0.2-1.1-0.6-1.2 0-0.1 0.1-0.1 0.1-0.1 0.3-0.1 0.7-0.3 0.6-0.6 0-0.4-0.4-0.6-0.8-0.6-0.2 0-0.4 0-0.6 0.1-0.4 0.2-0.9 0.4-1.5 0.4 1.1-0.8 2.5-1.2 3.9-1.2 0.3 0 0.5 0 0.8 0-0.6 0.1-1.2 0.3-1.6 0.5 0.6 0.1 0.7 0.4 0.5 0.9-0.1 0.2 0 0.4 0.2 0.5s0.4 0.1 0.5-0.1c0.2-0.3 0.6-0.4 0.9-0.5 0.4-0.1 0.7-0.3 1-0.7 0-0.1 0.1-0.1 0.2-0.2 0.6 0.2 1.2 0.6 1.8 1-0.1 0-0.1 0.1-0.2 0.1-0.2 0.2-0.5 0.3-0.2 0.7 0.1 0.2 0 0.3-0.1 0.4-0.2 0.1-0.3 0-0.4-0.1s-0.1-0.3-0.4-0.3c-0.1 0.2-0.4 0.3-0.4 0.6 0.5 0 0.4 0.4 0.5 0.7-0.6 0.1-0.8 0.4-0.5 0.9 0.1 0.2-0.1 0.3-0.2 0.4-0.4 0.6-0.8 1-0.8 1.7s0.5 1.4 1.3 1.3c0.9-0.1 0.9-0.1 1.2 0.7 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.2 0.4 0.1 0.6-0.3 0.8 0.1 1.4 0.4 2 0.1 0.2 0.2 0.3 0.3 0.4-1.3 1.4-3 2.2-5 2.2z"></path></g> */}
          {/* <g id="user-card"><path d="M15 3v10h-14v-10h14zM16 2h-16v12h16v-12z"></path><path d="M8 5h6v1h-6v-1z"></path><path d="M8 7h6v1h-6v-1z"></path><path d="M8 9h3v1h-3v-1z"></path><path d="M5.4 7h-0.4v-0.1c0.6-0.2 1-0.8 1-1.4 0-0.8-0.7-1.5-1.5-1.5s-1.5 0.7-1.5 1.5c0 0.7 0.4 1.2 1 1.4v0.1h-0.4c-0.9 0-1.6 0.7-1.6 1.6v2.4h5v-2.4c0-0.9-0.7-1.6-1.6-1.6z"></path></g> */}
          <div className={classes.previewModes} ref={previewModes}>
            <InputSelection
              id="web"
              inputPos="bottom"
              className={classes.radioIcon}
              name="viewPort"
              label={
                <Icon
                  alt="On the web"
                  style={{ fontSize: "1.6em", marginTop: "-8px" }}
                >
                  {/* <g id="mobile-browser"><path d="M16 0h-13v5h-3v11h7v-3h9v-13zM6 1h9v1h-9v-1zM4 1h1v1h-1v-1zM4 15h-1v-1h1v1zM6 13h-5v-7h5v7zM15 12h-8v-7h-3v-2h11v9z"></path></g> */}
                  {/* {< id="glasses">} */}
                  {/* <path d="M15.5 7h-0.5c-0.1 0-0.1 0-0.2 0-0.4-1.2-1.5-2-2.8-2s-2.4 0.9-2.8 2.1c-0.3-0.4-0.7-0.6-1.2-0.6s-0.9 0.2-1.2 0.6c-0.4-1.2-1.5-2.1-2.8-2.1s-2.4 0.9-2.8 2c-0.1 0-0.1 0-0.2 0h-0.5c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5h0.5c0 1.7 1.3 3 3 3 1.5 0 2.7-1.1 3-2.5 0 0 0 0 0 0 0.3 0 0.5-0.2 0.5-0.5s0.2-0.5 0.5-0.5 0.5 0.2 0.5 0.5c0 0.3 0.2 0.5 0.5 0.5 0 0 0 0 0 0 0.2 1.4 1.5 2.5 3 2.5 1.7 0 3-1.3 3-3h0.5c0.3 0 0.5-0.2 0.5-0.5s-0.2-0.5-0.5-0.5zM4 10c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2zM12 10c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z"></path> */}
                  {/* wire globe */}
                  {/* <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM14.8 9.5c0 0.5-0.7 0.66-2 1 0.124-0.589 0.206-1.277 0.229-1.98l2.001-0.020c0 0.36-0.080 0.5-0.16 1v0zM1.2 9.5v0c-0.1-0.5-0.15-0.64-0.2-1h2c0.024 0.723 0.106 1.411 0.244 2.079-1.344-0.419-2.044-0.579-2.044-1.079zM1.2 6.5c0-0.5 0.7-0.66 2-1-0.115 0.594-0.187 1.284-0.2 1.989l-2 0.011c0-0.36 0.080-0.5 0.16-1v0zM8.5 5c1.13 0.013 2.226 0.107 3.298 0.277 0.047 0.643 0.165 1.41 0.201 2.199l-3.499 0.025v-2.5zM8.5 4v-2.94c1.17 0.27 2.2 1.47 2.84 3.15-0.836-0.116-1.819-0.192-2.817-0.21zM7.5 1.060v2.94c-1.017 0.015-2.001 0.087-2.968 0.214 0.768-1.684 1.798-2.884 2.968-3.154zM7.5 5v2.5h-3.5c0.031-0.806 0.142-1.571 0.326-2.307 0.932-0.080 2.035-0.177 3.158-0.193zM4 8.5h3.5v2.5c-1.13-0.013-2.226-0.107-3.298-0.277-0.047-0.643-0.165-1.41-0.201-2.199zM7.5 12v2.94c-1.17-0.27-2.2-1.47-2.84-3.15 0.836 0.116 1.819 0.192 2.817 0.21zM8.5 14.94v-2.94c1.017-0.015 2.001-0.087 2.968-0.214-0.768 1.684-1.798 2.884-2.968 3.154zM8.5 11v-2.5h3.5c-0.031 0.806-0.142 1.571-0.326 2.307-0.932 0.080-2.035 0.177-3.158 0.193zM15 7.5h-2c-0.024-0.723-0.106-1.411-0.244-2.079 1.354 0.399 2.014 0.559 2.014 1.079v0c0.13 0.5 0.18 0.64 0.23 1zM14.3 4.91c-0.506-0.204-1.106-0.38-1.726-0.5-0.361-1.019-0.809-1.898-1.389-2.672 1.355 0.726 2.413 1.811 3.067 3.131zM4.84 1.76c-0.568 0.752-1.019 1.631-1.305 2.581-0.699 0.189-1.299 0.365-1.874 0.593 0.751-1.39 1.823-2.475 3.139-3.156zM1.73 11.090c0.506 0.204 1.106 0.38 1.726 0.5 0.361 1.019 0.809 1.898 1.389 2.672-1.367-0.722-2.436-1.807-3.097-3.131zM11.17 14.24c0.564-0.753 1.012-1.631 1.295-2.581 0.699-0.189 1.299-0.365 1.874-0.593-0.751 1.39-1.823 2.475-3.139 3.156z"></path> */}
                  {/* <path d="M15 3v10h-14v-10h14zM16 2h-16v12h16v-12z"></path>
                  <path d="M8 5h6v1h-6v-1z"></path>
                  <path d="M8 7h6v1h-6v-1z"></path>
                  <path d="M8 9h3v1h-3v-1z"></path>
                  <path d="M5.4 7h-0.4v-0.1c0.6-0.2 1-0.8 1-1.4 0-0.8-0.7-1.5-1.5-1.5s-1.5 0.7-1.5 1.5c0 0.7 0.4 1.2 1 1.4v0.1h-0.4c-0.9 0-1.6 0.7-1.6 1.6v2.4h5v-2.4c0-0.9-0.7-1.6-1.6-1.6z"></path> */}
                  <g id="connect-o">
                    <path d="M12.5 9c-1 0-1.8 0.4-2.4 1l-3.2-1.7c0.1-0.3 0.1-0.5 0.1-0.8 0-0.2 0-0.3 0-0.4l2.9-1.3c0.6 0.7 1.5 1.2 2.6 1.2 1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5c0 0.2 0 0.3 0 0.4l-2.9 1.3c-0.6-0.7-1.5-1.2-2.6-1.2-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5c1 0 1.8-0.4 2.4-1l3.1 1.7c0 0.3 0 0.5 0 0.8 0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zM12.5 1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5zM3.5 10c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5zM12.5 15c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z"></path>
                  </g>
                  {/* <g id="share">
                    <path d="M10 3h-5.1c0 0-4.9 0-4.9 5 0 3.9 3 8 3 8s-1.7-7 1.8-7h5.2v3l6-6-6-6v3z"></path>
                  </g> */}
                  <g id="health-card">
                    {/* <path d="M15 3v10h-14v-10h14zM16 2h-16v12h16v-12z"></path>
                    <path d="M9 5h5v1h-5v-1z"></path>
                    <path d="M9 7h5v1h-5v-1z"></path>
                    <path d="M9 9h2v1h-2v-1z"></path> */}

                    {/* <path d="M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path> */}
                    {/* <path d="M2 10v2h12v-1c0 0 0.2-1.7-2-2-1.9-0.3-2.2 0.6-3.8 0.6-1.1 0-0.9-1.6-3.2-1.6-1.7 0-3 2-3 2z"></path> */}
                    {/* <path d="M13 6c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path> */}
                    {/* <path d="M16 14h-16v-12h16v12zM1 13h14v-10h-14v10z"></path> */}
                    {/* <g id="picture">
                      <path d="M16 14h-16v-12h16v12zM1 13h14v-10h-14v10z"></path>
                      <path d="M2 10v2h12v-1c0 0 0.2-1.7-2-2-1.9-0.3-2.2 0.6-3.8 0.6-1.1 0-0.9-1.6-3.2-1.6-1.7 0-3 2-3 2z"></path>
                      <path d="M13 6c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
                    </g> */}
                    {/* <path d="M6.5 5c0 0 0 0 0 0-0.6 0-1.1 0.6-1.5 1-0.4-0.4-0.9-1-1.5-1 0 0 0 0 0 0-1.5 0-2.1 1.9-1 2.9l2.5 2.1 2.5-2.1c1.1-1 0.5-2.9-1-2.9z"></path> */}
                  </g>
                </Icon>
              }
              type="radio"
              vol={1}
            />
            <InputSelection
              id="laptop"
              inputPos="bottom"
              className={classes.radioIcon}
              name="viewPort"
              label={
                <Icon alt="Laptop">
                  {/* laptop */}
                  <path d="M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z"></path>
                </Icon>
              }
              type="radio"
              vol={1}
            />
            <InputSelection
              id="tablet"
              inputPos="bottom"
              className={classes.radioIcon}
              name="viewPort"
              label={
                <Icon alt="Tablet">
                  {/* tablet.svg */}
                  <path d="M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z"></path>
                </Icon>
              }
              type="radio"
              vol={1}
            />
            <InputSelection
              id="mobile"
              inputPos="bottom"
              className={classes.radioIcon}
              name="viewPort"
              label={
                <Icon alt="Mobile">
                  {/* mobile */}
                  <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
                </Icon>
              }
              type="radio"
              vol={1}
            />

            {/* <g id="expand-full"><path d="M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z"></path><path d="M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z"></path><path d="M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z"></path><path d="M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z"></path></g> */}
          </div>
          <div className={classes.previewFullScreen}>
            <Button
              icon={
                <Icon alt="Select action">
                  {/* fullscreen */}
                  <path d="M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z"></path>
                  <path d="M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z"></path>
                  <path d="M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z"></path>
                  <path d="M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z"></path>
                </Icon>
              }
              // aria-controls={open ? 'split-button-menu' : undefined}
              // aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
            ></Button>
          </div>
          <div className={classes.preview} ref={preview}>
            <div className={classes.appWrap}>
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
              Different requirements with different skill levels within teams
              and different ideas on what should be allowed or even possible in
              terms of lockdown.
            </div>
          </div>
          <div className={classes.actions}>
            <ButtonGroup vol={2} tone={2} variant={1}>
              <Button>Publish</Button>
              <Button
                icon={
                  <Icon alt="Select action">
                    {/* < id="chevron-down-small"> */}
                    <path d="M8 12l-6.32-6.32 1.67-1.68 4.65 4.65 4.65-4.65 1.67 1.68-6.32 6.32z"></path>
                  </Icon>
                }
                // aria-controls={open ? 'split-button-menu' : undefined}
                // aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
              ></Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
    // </DefaultLayout>
  );
};

export default EditPreview;
