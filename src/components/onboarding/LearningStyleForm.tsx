import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const learningStyleSchema = z.object({
  learning_style: z.enum(["visual", "auditory", "kinesthetic", "mixed"]),
  prior_experience: z.string().min(1, "Please describe your prior experience"),
  preferred_schedule: z.array(z.string()).min(1, "Select at least one preferred schedule"),
  learning_goals: z.array(z.string()).min(1, "Select at least one learning goal"),
});

type LearningStyleFormValues = z.infer<typeof learningStyleSchema>;

export function LearningStyleForm() {
  const { toast } = useToast();
  const form = useForm<LearningStyleFormValues>({
    resolver: zodResolver(learningStyleSchema),
    defaultValues: {
      learning_style: "mixed",
      prior_experience: "",
      preferred_schedule: [],
      learning_goals: [],
    },
  });

  const onSubmit = async (data: LearningStyleFormValues) => {
    try {
      const { error } = await supabase
        .from("student_profiles")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your learning preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="learning_style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Learning Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your learning style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic (Hands-on)</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prior_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prior Driving Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe any previous driving experience..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}