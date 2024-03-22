/* eslint-disable @typescript-eslint/no-explicit-any */
import { people } from "../../data";
import { PersonModel } from "../../models/person";

interface SelectPersonProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  value?: string;
}

const SelectPerson = ({ onChange, name, value }: SelectPersonProps) => {
  return (
    <select value={value} onChange={onChange} name={name} id="person">
      <option value="" disabled>
        Assignee
      </option>
      {people.map((person: PersonModel) => {
        return (
          <option key={person.id} value={person.name}>
            {person.name}
          </option>
        );
      })}
    </select>
  );
};
export default SelectPerson;
