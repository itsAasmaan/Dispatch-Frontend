import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User, AtSign, Briefcase } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { getValidationErrors } from "../../utils/helpers";
import { cn } from "../../utils/helpers";

const ROLES = [
  {
    value: "candidate",
    label: "Candidate",
    desc: "I want to prepare for interviews and share my experiences",
    icon: "🎯",
  },
  {
    value: "company",
    label: "Company",
    desc: "I represent a company and want to manage our interview presence",
    icon: "🏢",
  },
];

const Register = () => {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("candidate");

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "candidate",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    registerUser.mutate(
      { ...data, role: selectedRole },
      {
        onError: (error) => {
          const validationErrors = getValidationErrors(error);
          Object.entries(validationErrors).forEach(([field, messages]) => {
            setError(field, { message: messages[0] });
          });
        },
      },
    );
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join thousands of developers preparing smarter">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-dark-200">
            I am a <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200",
                  selectedRole === role.value
                    ? "border-primary-500 bg-primary-500/10"
                    : "border-dark-700 bg-dark-800/50 hover:border-dark-600",
                )}
              >
                <span className="text-2xl">{role.icon}</span>
                <p
                  className={cn(
                    "font-medium text-sm mt-2",
                    selectedRole === role.value ? "text-primary-400" : "text-dark-200",
                  )}
                >
                  {role.label}
                </p>
                <p className="text-xs text-dark-500 mt-0.5 leading-relaxed">{role.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <Input
          label="Full name"
          type="text"
          placeholder="John Doe"
          icon={<User size={16} />}
          error={errors.name?.message}
          required
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name too short" },
            maxLength: { value: 100, message: "Name too long" },
          })}
        />

        {/* Username */}
        <Input
          label="Username"
          type="text"
          placeholder="john_doe"
          icon={<AtSign size={16} />}
          hint="Letters, numbers, dashes and underscores only"
          error={errors.username?.message}
          required
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: "Only letters, numbers, dashes and underscores",
            },
            minLength: { value: 3, message: "At least 3 characters" },
            maxLength: { value: 50, message: "Max 50 characters" },
          })}
        />

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
              message: "Enter a valid email",
            },
          })}
        />

        {/* Password */}
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 characters"
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
            minLength: { value: 8, message: "At least 8 characters" },
          })}
        />

        {/* Confirm Password */}
        <Input
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          placeholder="Repeat your password"
          icon={<Lock size={16} />}
          error={errors.password_confirmation?.message}
          required
          {...register("password_confirmation", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        {/* Submit */}
        <Button type="submit" loading={registerUser.isPending} className="w-full mt-2">
          Create Account
        </Button>

        {/* Login link */}
        <p className="text-center text-sm text-dark-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
