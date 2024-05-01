import { Navigate } from 'react-router-dom';
import { RouterPaths } from '../routes';

const NavigateToDefault = () => <Navigate replace to={RouterPaths.home} />;

export default NavigateToDefault;
