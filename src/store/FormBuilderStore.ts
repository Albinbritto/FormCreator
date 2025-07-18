import { create } from "zustand";
import { FORM_ELEMENTS } from "../api/mock";
import {
  FormElement,
  FormElements,
  IFieldMetaData,
} from "../pages/FormBuilder/type";
import { Field, Form, Page } from "../models/Form";
import { immer } from "zustand/middleware/immer";
import { RegisterOptions } from "react-hook-form";
import { generateUniqueId } from "../utils/util";

interface IActiveElement {
  data: Field | Page | Form | null;
  type: "field" | "page" | "form" | null;
}

interface FormBuilderState {
  formMetaData: Form;
  updateMetaData: (newFormMetaData: Form) => void;
  formElements: FormElements;
  updateFormElement: (element: FormElement, id: string) => void;
  insertField: (page: Page, field: IFieldMetaData, index: number) => void;
  removeField: (page: Page, fieldId: string) => void;
  moveField: (
    uniqueId: string,
    page: Page,
    activeIndex: number,
    overIndex: number
  ) => void;
  swapFieldBetweenPage: (
    activePage: Page,
    fieldId: string,
    overPage: Page,
    field: IFieldMetaData,
    newIndex: number
  ) => void;
  addPage: (page: Page, index: number) => void;
  updatePageProperties: (page: Page, newProps: Partial<Page>) => void;
  updateFormProperties: (newProps: Partial<Form>) => void;
  activeElement: IActiveElement | null;
  setActiveElement: (element: IActiveElement | null) => void;
  updateFieldProperties: (
    page: Page,
    fieldId: string,
    newProps: Partial<IFieldMetaData>
  ) => void;
  removePage: (pageId: string) => void;
  updateRules: (
    page: Page,
    fieldId: string,
    newRules: Partial<RegisterOptions>
  ) => void;
  removeRule: (
    page: Page,
    fieldId: string,
    rule: keyof RegisterOptions
  ) => void;
}

export const useFormBuilderStore = create<FormBuilderState>()(
  immer<FormBuilderState>((set) => ({
    activeElement: null,
    formMetaData: new Form({
      pages: [new Page({ pageName: "Untitled Page" })],
    }),
    activeField: null,
    activePage: null,
    formElements: FORM_ELEMENTS,
    setActiveElement: (element) =>
      set((state) => {
        state.activeElement = element;
      }),
    updatePageProperties: (page, newProps) =>
      set((state) => {
        page.updateProperties(newProps);
        state.formMetaData = state.formMetaData.clone();
        state.activeElement = {
          data:
            state.formMetaData.pages.find((p) => p.pageId === page.pageId) ||
            null,
          type: "page",
        };
      }),
    updateFormProperties: (newProps) =>
      set((state) => {
        state.formMetaData.updateProperties(newProps);
        state.formMetaData = state.formMetaData.clone();
      }),
    updateFormElement: (element: FormElement, id: string) =>
      set((state) => {
        const { formElements } = state;
        Object.keys(formElements).forEach((category) => {
          const { elements } = formElements[category];
          const index = elements.findIndex((el: FormElement) => el.id === id);
          if (index !== -1) {
            elements[index] = element;
          }
        });
      }),
    updateMetaData: (newFormMetaData) =>
      set((state) => {
        state.formMetaData = newFormMetaData;
      }),
    addPage: (page: Page, index: number) =>
      set((state) => {
        state.formMetaData.addPage(page, index);
        const uniqueId = generateUniqueId();
        page.addField(
          page.createField({
            fieldId: uniqueId,
            type: "singleline",
            label: "untitled text",
            pageId: page.pageId,
            fieldName: `untitled text_${uniqueId}`,
          })
        );
        state.formMetaData = state.formMetaData.clone();
        state.activeElement = {
          data: page,
          type: "page",
        };
      }),
    insertField: (page, field, index) =>
      set((state) => {
        const fieldObj = page.insertField(field, index);
        state.formMetaData = state.formMetaData.clone();
        state.activeElement = {
          data: fieldObj,
          type: "field",
        };
      }),
    swapFieldBetweenPage: (activePage, fieldId, overPage, field, newIndex) =>
      set((state) => {
        activePage.removeField(fieldId);
        const fieldObj = overPage.insertField(field, newIndex);
        state.formMetaData = state.formMetaData.clone();
        state.activeElement = {
          data: fieldObj,
          type: "field",
        };
      }),
    removeField: (page, fieldId) =>
      set((state) => {
        page.removeField(fieldId);
        state.formMetaData = state.formMetaData.clone();
      }),
    updateFieldProperties: (page, fieldId, newProps) =>
      set((state) => {
        page.updateFieldProperties(fieldId, newProps);
        state.formMetaData = state.formMetaData.clone();
        const updatedPage = state.formMetaData.findPage(page.pageId);
        state.activeElement = {
          data:
            updatedPage?.fields.find((field) => field.fieldId === fieldId) ||
            null,
          type: "field",
        };
      }),
    updateRules: (page, fieldId, rules) =>
      set((state) => {
        page.updateFieldRules(fieldId, rules);
        state.formMetaData = state.formMetaData.clone();
        const updatedPage = state.formMetaData.findPage(page.pageId);
        state.activeElement = {
          data:
            updatedPage?.fields.find((field) => field.fieldId === fieldId) ||
            null,
          type: "field",
        };
      }),
    removeRule: (page, fieldId, rule) =>
      set((state) => {
        page.removeFieldRule(fieldId, rule);
        state.formMetaData = state.formMetaData.clone();
        const updatedPage = state.formMetaData.findPage(page.pageId);
        state.activeElement = {
          data:
            updatedPage?.fields.find((field) => field.fieldId === fieldId) ||
            null,
          type: "field",
        };
      }),
    moveField: (uniqueId, page, activeIndex, overIndex) =>
      set((state) => {
        page.moveField(activeIndex, overIndex);
        page.fields[overIndex].fieldId = uniqueId;
        page.fields[
          overIndex
        ].fieldName = `${page.fields[overIndex].label}_${uniqueId}`;
        state.activeElement = {
          data: page.fields[overIndex],
          type: "field",
        };
        state.formMetaData = state.formMetaData.clone();
      }),
    removePage: (pageId: string) =>
      set((state) => {
        state.formMetaData.removePage(pageId);
        state.formMetaData = state.formMetaData.clone();
      }),
  }))
);
