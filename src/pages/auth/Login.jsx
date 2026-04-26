import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { getValidationErrors } from "../../utils/helpers";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    login.mutate(data, {
      onError: (error) => {
        const validationErrors = getValidationErrors(error);
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
      },
    });
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Dispatch account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          error={errors.email?.message}
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        {/* Password */}
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          icon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          required
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {/* Submit */}
        <Button type="submit" loading={login.isPending} className="w-full mt-2">
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-dark-950 px-3 text-dark-500">or</span>
          </div>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-dark-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
            Create one free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
