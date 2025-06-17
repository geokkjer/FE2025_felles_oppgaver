// src/metadata/schemas.ts
export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number';
}

export const schemas = {
  ingredient: [
    { name: 'amount', label: 'Antall', type: 'number' },
    { name: 'unit',   label: 'Enhet',  type: 'text'   },
    { name: 'food',   label: 'Matvare',type: 'text'   }
  ] as Field[],

  step: [
    { name: 'text',   label: 'Trinn',  type: 'text'   }
  ] as Field[]
};