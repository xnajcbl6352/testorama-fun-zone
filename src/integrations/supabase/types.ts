export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievement_progress: {
        Row: {
          achievement_id: string | null
          current_progress: number | null
          id: string
          last_updated: string | null
          student_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          current_progress?: number | null
          id?: string
          last_updated?: string | null
          student_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          current_progress?: number | null
          id?: string
          last_updated?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievement_progress_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievement_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      achievements: {
        Row: {
          category: Database["public"]["Enums"]["achievement_category"] | null
          created_at: string
          criteria: Json | null
          description: string
          icon_url: string | null
          id: string
          name: string
          next_tier_threshold: number | null
          points: number | null
          requirements: Json | null
          tier: Database["public"]["Enums"]["achievement_tier"] | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["achievement_category"] | null
          created_at?: string
          criteria?: Json | null
          description: string
          icon_url?: string | null
          id?: string
          name: string
          next_tier_threshold?: number | null
          points?: number | null
          requirements?: Json | null
          tier?: Database["public"]["Enums"]["achievement_tier"] | null
        }
        Update: {
          category?: Database["public"]["Enums"]["achievement_category"] | null
          created_at?: string
          criteria?: Json | null
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
          next_tier_threshold?: number | null
          points?: number | null
          requirements?: Json | null
          tier?: Database["public"]["Enums"]["achievement_tier"] | null
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          status: string
          task_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          status: string
          task_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          status?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_logs_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "automation_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_tasks: {
        Row: {
          action_config: Json
          action_type: string
          created_at: string | null
          id: string
          last_run: string | null
          name: string
          next_run: string | null
          status: string | null
          trigger_config: Json
          trigger_type: string
          type: string
          updated_at: string | null
        }
        Insert: {
          action_config: Json
          action_type: string
          created_at?: string | null
          id?: string
          last_run?: string | null
          name: string
          next_run?: string | null
          status?: string | null
          trigger_config: Json
          trigger_type: string
          type: string
          updated_at?: string | null
        }
        Update: {
          action_config?: Json
          action_type?: string
          created_at?: string | null
          id?: string
          last_run?: string | null
          name?: string
          next_run?: string | null
          status?: string | null
          trigger_config?: Json
          trigger_type?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          ab_test_config: Json | null
          budget: number | null
          created_at: string | null
          end_date: string | null
          id: string
          metrics: Json | null
          name: string
          start_date: string
          status: string | null
          target_audience: Json | null
          type: string
          updated_at: string | null
        }
        Insert: {
          ab_test_config?: Json | null
          budget?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name: string
          start_date: string
          status?: string | null
          target_audience?: Json | null
          type: string
          updated_at?: string | null
        }
        Update: {
          ab_test_config?: Json | null
          budget?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          start_date?: string
          status?: string | null
          target_audience?: Json | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      classes: {
        Row: {
          attendance_marked: boolean | null
          cancellation_reason: string | null
          cancelled_at: string | null
          created_at: string | null
          date: string
          end_time: string
          id: string
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          route_plan: Json | null
          start_time: string
          status: Database["public"]["Enums"]["class_status"] | null
          student_id: string
          teacher_id: string
          type: Database["public"]["Enums"]["class_type"]
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          attendance_marked?: boolean | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          route_plan?: Json | null
          start_time: string
          status?: Database["public"]["Enums"]["class_status"] | null
          student_id: string
          teacher_id: string
          type: Database["public"]["Enums"]["class_type"]
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          attendance_marked?: boolean | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          route_plan?: Json | null
          start_time?: string
          status?: Database["public"]["Enums"]["class_status"] | null
          student_id?: string
          teacher_id?: string
          type?: Database["public"]["Enums"]["class_type"]
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          student_id: string | null
          type: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          student_id?: string | null
          type: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          student_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string
          status: Database["public"]["Enums"]["payment_status"] | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_contact: string | null
          last_name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_contact?: string | null
          last_name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_contact?: string | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          completed_modules: Json | null
          current_modules: Json | null
          id: string
          last_updated: string
          recommendations: Json | null
          student_id: string | null
        }
        Insert: {
          completed_modules?: Json | null
          current_modules?: Json | null
          id?: string
          last_updated?: string
          recommendations?: Json | null
          student_id?: string | null
        }
        Update: {
          completed_modules?: Json | null
          current_modules?: Json | null
          id?: string
          last_updated?: string
          recommendations?: Json | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          name: string
          subject: string | null
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          name: string
          subject?: string | null
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes: string | null
          payment_date: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          payment_date?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          payment_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_packages: {
        Row: {
          base_price: number
          created_at: string | null
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          seasonal_multiplier: number | null
          updated_at: string | null
        }
        Insert: {
          base_price: number
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          seasonal_multiplier?: number | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          seasonal_multiplier?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      promotions: {
        Row: {
          code: string
          conditions: Json | null
          created_at: string | null
          end_date: string | null
          id: string
          start_date: string
          type: string
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
          value: number
        }
        Insert: {
          code: string
          conditions?: Json | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date: string
          type: string
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          value: number
        }
        Update: {
          code?: string
          conditions?: Json | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          type?: string
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      records: {
        Row: {
          created_at: string | null
          creation_date: string | null
          dgt_comments: string | null
          dgt_response: Json | null
          dgt_response_date: string | null
          dgt_response_status: string | null
          dgt_submission_date: string | null
          document_url: string | null
          id: string
          record_number: string
          status: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creation_date?: string | null
          dgt_comments?: string | null
          dgt_response?: Json | null
          dgt_response_date?: string | null
          dgt_response_status?: string | null
          dgt_submission_date?: string | null
          document_url?: string | null
          id?: string
          record_number: string
          status?: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creation_date?: string | null
          dgt_comments?: string | null
          dgt_response?: Json | null
          dgt_response_date?: string | null
          dgt_response_status?: string | null
          dgt_submission_date?: string | null
          document_url?: string | null
          id?: string
          record_number?: string
          status?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string
          id: string
          student_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string
          id?: string
          student_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_achievements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          created_at: string
          current_level: Database["public"]["Enums"]["student_level"] | null
          id: string
          learning_goals: string[] | null
          learning_style: Database["public"]["Enums"]["learning_style"]
          points: number | null
          preferred_schedule: string[] | null
          prior_experience: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_level?: Database["public"]["Enums"]["student_level"] | null
          id: string
          learning_goals?: string[] | null
          learning_style?: Database["public"]["Enums"]["learning_style"]
          points?: number | null
          preferred_schedule?: string[] | null
          prior_experience?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_level?: Database["public"]["Enums"]["student_level"] | null
          id?: string
          learning_goals?: string[] | null
          learning_style?: Database["public"]["Enums"]["learning_style"]
          points?: number | null
          preferred_schedule?: string[] | null
          prior_experience?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          birth_date: string
          created_at: string | null
          dni: string
          email: string | null
          first_name: string
          gdpr_consent: boolean | null
          id: string
          last_name: string
          phone: string | null
          registration_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date: string
          created_at?: string | null
          dni: string
          email?: string | null
          first_name: string
          gdpr_consent?: boolean | null
          id?: string
          last_name: string
          phone?: string | null
          registration_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string
          created_at?: string | null
          dni?: string
          email?: string | null
          first_name?: string
          gdpr_consent?: boolean | null
          id?: string
          last_name?: string
          phone?: string | null
          registration_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      vehicle_maintenance: {
        Row: {
          cost: number | null
          created_at: string | null
          description: string | null
          id: string
          maintenance_date: string
          maintenance_type: string
          next_maintenance_date: string | null
          status: string | null
          updated_at: string | null
          vehicle_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          maintenance_date: string
          maintenance_type: string
          next_maintenance_date?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          maintenance_date?: string
          maintenance_type?: string
          next_maintenance_date?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          brand: string
          created_at: string | null
          id: string
          mileage: number | null
          model: string
          next_maintenance_date: string | null
          plate_number: string
          status: Database["public"]["Enums"]["vehicle_status"] | null
          type: Database["public"]["Enums"]["vehicle_type"]
          updated_at: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          id?: string
          mileage?: number | null
          model: string
          next_maintenance_date?: string | null
          plate_number: string
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          type: Database["public"]["Enums"]["vehicle_type"]
          updated_at?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          id?: string
          mileage?: number | null
          model?: string
          next_maintenance_date?: string | null
          plate_number?: string
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          type?: Database["public"]["Enums"]["vehicle_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      achievement_category: "Speed" | "Accuracy" | "Persistence"
      achievement_tier: "Bronze" | "Silver" | "Gold"
      class_status: "scheduled" | "completed" | "cancelled"
      class_type: "theoretical" | "practical" | "exam"
      learning_style: "visual" | "auditory" | "kinesthetic" | "mixed"
      payment_method: "cash" | "card" | "transfer"
      payment_status: "pending" | "paid" | "overdue"
      record_status: "pending" | "in_progress" | "completed"
      student_level: "beginner" | "intermediate" | "advanced"
      vehicle_status: "available" | "in_use" | "maintenance"
      vehicle_type: "car" | "motorcycle" | "truck"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
