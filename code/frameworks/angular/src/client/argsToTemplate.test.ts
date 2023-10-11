import { argsToTemplate, ArgsToTemplateOptions } from './argsToTemplate'; // adjust path

describe('argsToTemplate', () => {
  it('should correctly convert args to template string and exclude undefined values', () => {
    const args: Record<string, any> = {
      prop1: 'value1',
      prop2: undefined,
      prop3: 'value3',
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {};
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1" [prop3]="prop3"');
  });

  it('should include properties from include option', () => {
    const args = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3',
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {
      include: ['prop1', 'prop3'],
    };
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1" [prop3]="prop3"');
  });

  it('should include non-undefined properties from include option', () => {
    const args: Record<string, any> = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: undefined,
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {
      include: ['prop1', 'prop3'],
    };
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1"');
  });

  it('should exclude properties from exclude option', () => {
    const args = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3',
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {
      exclude: ['prop2'],
    };
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1" [prop3]="prop3"');
  });

  it('should exclude properties from exclude option and undefined properties', () => {
    const args: Record<string, any> = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: undefined,
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {
      exclude: ['prop2'],
    };
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1"');
  });

  it('should prioritize include over exclude when both options are given', () => {
    const args = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3',
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {
      include: ['prop1', 'prop2'],
      exclude: ['prop2', 'prop3'],
    };
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1" [prop2]="prop2"');
  });

  it('should work when neither include nor exclude options are given', () => {
    const args = {
      prop1: 'value1',
      prop2: 'value2',
    };
    const options: ArgsToTemplateOptions<keyof typeof args> = {};
    const result = argsToTemplate(args, options);
    expect(result).toBe('[prop1]="prop1" [prop2]="prop2"');
  });
});
