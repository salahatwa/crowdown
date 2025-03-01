import { IFormConfig } from "src/app/shared/components/ui/dynamic-form-builder/shared/model/form-config.interface";

export const QR_FORM: IFormConfig = {
    // title: 'Profile',
    formControlConfig: {
        elementSize: 'medium',
        simpleValidationError: true,
    },
    fields: [
        // {
        //     type: 'range',
        //     name: 'width',
        //     label: 'Width',
        //     defaultValue: 200,
        //     rangeMin: 200,
        //     rangeMax: 800,
        // },
        // {
        //     type: 'range',
        //     name: 'height',
        //     label: 'Height',
        //     defaultValue: 200,
        //     rangeMin: 200,
        //     rangeMax: 800,
        // },
        {
            type: 'text',
            name: 'data',
            label: 'Data',
            placeholder: 'Enter your data',
            id: 'data',
            validators: [
                { rule: 'required', msg: 'Data is required' },
                {
                    rule: 'minlength',
                    value: 4,
                    msg: 'Data be at least 4 characters long',
                },
            ],
        },

        {
            type: 'form-group',
            name: 'qrOptions',
            label: 'QR Options',
            formGroup: {
                showInCard: true,
                fields: [
                    {
                        type: 'dropdown',
                        name: 'errorCorrectionLevel',
                        label: 'Error Correction Level',
                        defaultValue: 'Q',
                        options: [
                            { key: 'L', label: 'Low' },
                            { key: 'M', label: 'Medium' },
                            { key: 'Q', label: 'Normal' },
                            { key: 'H', label: 'Heigh' },
                        ],
                    }
                ]
            }
        },

        {
            type: 'form-group',
            name: 'backgroundOptions',
            label: 'Background Options',
            formGroup: {
                showInCard: true,
                fields: [
                    {
                        type: 'color',
                        name: 'color',
                        label: 'Color',
                        defaultValue: '#ffffff',
                        width: 100,
                    }
                ]
            }
        },

        {
            type: 'form-group',
            name: 'cornersSquareOptions',
            label: 'Corners Square Options',
            formGroup: {
                showInCard: true,
                fields: [
                    {
                        type: 'dropdown',
                        name: 'type',
                        label: 'Type',
                        defaultValue: 'dot',
                        options: [
                            { key: 'dot', label: 'Dot' },
                            { key: 'square', label: 'Square' },
                            { key: 'extra-rounded', label: 'Extra rounded' }
                        ],
                    },
                    {
                        type: 'color',
                        name: 'color',
                        label: 'Color',
                        // defaultValue: '#ffffff',
                        width: 100,
                    }
                ]
            }
        },

        {
            type: 'form-group',
            name: 'dotsOptions',
            label: 'Dots Options',
            formGroup: {
                showInCard: true,
                fields: [
                    {
                        type: 'dropdown',
                        name: 'type',
                        label: 'Type',
                        defaultValue: 'dots',
                        options: [
                            { key: 'dots', label: 'Dots' },
                            { key: 'rounded', label: 'Rounded' },
                            { key: 'classy', label: 'Classy' },
                            { key: 'classy-rounded', label: 'Classy rounded' },
                            { key: 'square', label: 'Square' },
                            { key: 'extra-rounded', label: 'Extra rounded' },
                            { key: 'classy', label: 'Classy' }
                        ],
                    },

                    {
                        type: 'form-group',
                        name: 'gradient',
                        label: 'Gradient Options',
                        formGroup: {
                            showInCard: true,
                            fields: [
                                {
                                    type: 'dropdown',
                                    name: 'type',
                                    label: 'Type',
                                    defaultValue: 'radial',
                                    options: [
                                        { key: 'radial', label: 'Radial' },
                                        { key: 'linear', label: 'Linear' }
                                    ],
                                }
                            ]
                        }
                    },
                ]
            }
        },
    ],
    buttonSetting: {
        fullWidthButtons: 'all',
        buttons: [
            { type: 'submit', caption: 'Submit', bgColor: 'blue' },
            { type: 'reset', caption: 'Reset', bgColor: 'orange' },
            { type: 'cancel', caption: 'Cancel', bgColor: 'light' },
        ],
    },
};