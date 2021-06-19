import React, { useRef } from "react";
import { Text, View, TextInput, Button, Alert, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from "./styles"
import { registration, signIn } from "../service/firebase";
import { Layout } from "@ui-kitten/components";

interface FormData {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
}


export default function SignUpScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data: FormData) => {
    console.log(data);
    registration(
      data.email,
      data.password,
      data.name
    );
    navigation.navigate('Loading');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              autoCapitalize="none"
            />
          )}
          rules={{
            required: "This is a required field"
          }}
          name="name"
          defaultValue=""
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="email"
          rules={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format"
            }
          }}
          defaultValue=""
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          rules={{
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          }}
          name="password"
          defaultValue=""
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <Text style={styles.label}>Retype Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          rules={{
            validate: value => value === password.current || "Passwords do not match"
          }}
          name="password_repeat"
          defaultValue=""
        />
        {errors.password_repeat && <Text style={styles.errorText}>{errors.password_repeat.message}</Text>}

        <Layout style={styles.button}>
          <Button
            color="white"
            title="Create a New Account"
            onPress={handleSubmit(onSubmit)}
          />
        </Layout>

        <Text style={styles.inlineText}>Already have an account</Text>

        <Layout style={styles.button}>
          <Button
            color="white"
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
          />
        </Layout>
      </Layout>
    </SafeAreaView>
  );
}
