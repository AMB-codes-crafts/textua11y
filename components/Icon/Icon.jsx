import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ name, color }) => (
  <FontAwesomeIcon icon={name} style={{ color }} />
);

export default Icon;
