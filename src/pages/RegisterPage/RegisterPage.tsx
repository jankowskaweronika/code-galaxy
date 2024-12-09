import AuthLayout from '../../layouts/AuthLayout';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { useRegister } from '../../hooks/useRegister';

const RegisterPage = () => {
    const registerLogic = useRegister();

    return (
        <AuthLayout>
            <RegisterForm onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            }} onSubmit={function (e: React.FormEvent<HTMLFormElement>): Promise<void> {
                throw new Error('Function not implemented.');
            }} onGoogleRegister={function (): Promise<void> {
                throw new Error('Function not implemented.');
            }} {...registerLogic} />
        </AuthLayout>
    );
};

export default RegisterPage