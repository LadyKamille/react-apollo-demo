import React from 'react';
import { LanguageFragment } from '../../generated/graphql';

interface LanguagesProps {
  languages: LanguageFragment;
}

const Languages: React.FC<LanguagesProps> = ({languages}):React.ReactElement => (
  <ul>
    {languages.nodes && languages.nodes.map((language) => (
      <li key={language?.id}>
        {language?.name}
      </li>
    ))}
  </ul>
);

export default Languages;
