import React, { useState, useEffect, useRef, ReactChild } from "react";

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

// function TextInputWithFocusButton() {
//   const inputEl = React.useRef(null);
//   const onButtonClick = () => {
//     // `current` points to the mounted text input element
//     inputEl && inputEl.current.focus();
//   };
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }

const EditPreview = ({ className: classNameProp, ...rest }: any) => {
  const slider = useRef<HTMLDivElement>(null);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [sliderScrolled, setSliderScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("forwards");

  const setSliderShuntPosition = _throttle(
    () => {
      if (slider.current !== null) {
        const currentOffset = slider.current.scrollTop;
        // console.log(currentOffset);
        // const direction = currentOffset > boardOffsetX ? "forwards" : "back";
        // console.log("in3", scrollDirection);
        setSliderOffset(currentOffset);
        // setScrollDirection(direction);

        // const currentOffset = slider.current.scrollLeft;
        // const direction = currentOffset > boardOffsetX ? "forwards" : "back";
        // setBoardOffsetX(slider.current.scrollLeft);
        // setScrollDirection(direction);
      }
    },
    1,
    { trailing: true }
  );

  useEffect(
    // Figure out where the scroll is going and set the class to position the item.
    () => {
      setSliderShuntPosition.cancel();
      // TODO: remove listener on unmount...
      slider.current !== null &&
        slider.current.addEventListener("scroll", setSliderShuntPosition);
    },
    [setSliderShuntPosition]
  );

  useEffect(
    // Figure out where the scroll is going and set the class to position the item.
    () => {
      // console.log("in", slider.current);
      if (slider.current !== null) {
        const currentOffset = slider.current.scrollTop;
        // console.log("in2", currentOffset, sliderOffset);
        if (
          // scrollDirection === "forwards" &&
          sliderOffset > 35 &&
          !sliderScrolled
        ) {
          setSliderScrolled(true);
          console.log("in");
          setSliderOffset(sliderOffset);
        }
      }
      // if (sliderOffset > 100 && !sliderScrolled) {
      //   setSliderScrolled(true);
      //   console.log("in");
      //   setSliderOffset(sliderOffset);
      // }
      if (
        sliderOffset === 0 &&
        // scrollDirection === "backwards" &&
        sliderScrolled
      ) {
        // console.log("in2");
        setSliderScrolled(false);
        // setSliderOffset(sliderOffset);
      }

      // sliderOffset < 100 && sliderScrolled && setSliderScrolled(false);
    },
    [sliderOffset, sliderScrolled]
  );

  return (
    // <DefaultLayout>
    <div>
      <div className={st(classnames(classes.root, classNameProp))}>
        <header className={classes.header}>Meuu</header>
        <div className={classes.internalGrid}>
          <div className={classes.content}>
            <div className={classes.scroll} ref={slider}>
              <div
                className={classnames(classes.contentBlock, classes.metaBlock, {
                  [classes.metaBlockMini]: sliderScrolled
                })}
              >
                <Label>Meta data</Label>
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

              <div className={classes.contentBlock}>
                <Label>Page Title</Label>
                <InputText
                  id="blah2"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={6}
                />
              </div>
              <div className={classes.contentBlock}>
                <Label>Banner</Label>
                <InputText
                  id="blah2"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={6}
                />
                <InputText
                  id="blah2"
                  labelVisuallyHidden
                  placeholder="Description"
                  label={"Page title"}
                  type="textarea"
                  // rows={}
                  vol={4}
                />
              </div>

              <div className={classes.contentBlock}>
                <Label>Body copydfg45a</Label>
                <InputText
                  id="blah2"
                  labelVisuallyHidden
                  placeholder="Content"
                  label={"Page title"}
                  type="textarea"
                  rows={3}
                  vol={3}
                />
              </div>
              <div className={classes.contentBlock}>
                <Label>Reference list</Label>
                <InputText
                  id="blah2"
                  labelVisuallyHidden
                  placeholder="Title"
                  label={"Page title"}
                  type="text"
                  vol={5}
                />
                <InputText
                  id="blah2"
                  labelVisuallyHidden
                  placeholder="Description"
                  label={"Page title"}
                  type="textarea"
                  // rows={}
                  vol={3}
                />
              </div>
              <div className={classes.contentBlock}>
                <H2 vol={6}>Block4</H2>
                <P>
                  When we hit publish we should get some feedback and then ask
                  the user what next.
                </P>
                <P>
                  Save the previous edited page and offer that up as a next
                  place... seems a common usecase for me.
                </P>
                <P>Autofocus on page new?</P>
                <P>Block3</P>
                <P>Block3</P>
              </div>
              <div className={classes.contentBlock}>
                <H2 vol={6}>Block5</H2>
                <P>Block2</P>
                <P>Block3</P>
                <P>Block3</P>
                <P>Block3</P>
              </div>
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
          <div className={classes.previewModes}>
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
          </div>
          <div className={classes.previewFullScreen}>
            <Button>Off</Button>
          </div>
          <div className={classes.preview}>
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
