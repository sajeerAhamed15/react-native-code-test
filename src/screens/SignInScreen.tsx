import React from "react";
import { View, TextInput, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Button, Text, Input, TopNavigation, Divider, Layout, Icon } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from "./styles"
import { loggingOut, signIn } from "../service/firebase";

interface FormData {
  email: string;
  password: string;
}


export default function SignInScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: FormData) => {
    console.log(data);
    // loggingOut();
    signIn(data.email, data.password);
  }
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );
  const AlertIcon = (props: any) => (
    <Icon {...props} name='alert-circle-outline'/>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Layout style={styles.container}>
        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
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
            <Input
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={secureTextEntry}
              caption='Should contain at least 8 symbols'
              accessoryRight={renderIcon}
              captionIcon={AlertIcon}
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

        <Button
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >Sign In</Button>

        <Text style={styles.inlineText}>Are you new? Create an account</Text>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >Sign Up</Button>
      </Layout>
    </SafeAreaView>
  );
}
