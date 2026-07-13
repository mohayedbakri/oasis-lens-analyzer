export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          approved: boolean
          author_name: string
          body: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          approved?: boolean
          author_name: string
          body: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          approved?: boolean
          author_name?: string
          body?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      funding: {
        Row: {
          allocated_usd: number
          label_ar: string
          label_en: string
          received_usd: number
          source: string | null
          wp_code: string
        }
        Insert: {
          allocated_usd?: number
          label_ar: string
          label_en: string
          received_usd?: number
          source?: string | null
          wp_code: string
        }
        Update: {
          allocated_usd?: number
          label_ar?: string
          label_en?: string
          received_usd?: number
          source?: string | null
          wp_code?: string
        }
        Relationships: []
      }
      global_indices: {
        Row: {
          blurb_ar: string | null
          blurb_en: string | null
          code: string
          id: string
          name_ar: string
          name_en: string
          rank: number | null
          score: number | null
          sort_order: number
          source_url: string | null
          total: number | null
          year: number | null
        }
        Insert: {
          blurb_ar?: string | null
          blurb_en?: string | null
          code: string
          id?: string
          name_ar: string
          name_en: string
          rank?: number | null
          score?: number | null
          sort_order?: number
          source_url?: string | null
          total?: number | null
          year?: number | null
        }
        Update: {
          blurb_ar?: string | null
          blurb_en?: string | null
          code?: string
          id?: string
          name_ar?: string
          name_en?: string
          rank?: number | null
          score?: number | null
          sort_order?: number
          source_url?: string | null
          total?: number | null
          year?: number | null
        }
        Relationships: []
      }
      milestones: {
        Row: {
          due_at: string | null
          id: string
          status: string
          title_ar: string
          title_en: string
          wp_code: string | null
        }
        Insert: {
          due_at?: string | null
          id?: string
          status?: string
          title_ar: string
          title_en: string
          wp_code?: string | null
        }
        Update: {
          due_at?: string | null
          id?: string
          status?: string
          title_ar?: string
          title_en?: string
          wp_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_wp_code_fkey"
            columns: ["wp_code"]
            isOneToOne: false
            referencedRelation: "funding"
            referencedColumns: ["wp_code"]
          },
        ]
      }
      pages: {
        Row: {
          sections: Json
          slug: string
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          sections?: Json
          slug: string
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Update: {
          sections?: Json
          slug?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          body_ar: string | null
          body_en: string | null
          cover_url: string | null
          created_at: string
          excerpt_ar: string | null
          excerpt_en: string | null
          id: string
          kind: Database["public"]["Enums"]["post_kind"]
          likes: number
          pdf_url: string | null
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          title_ar: string
          title_en: string
          updated_at: string
          views: number
        }
        Insert: {
          body_ar?: string | null
          body_en?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          id?: string
          kind: Database["public"]["Enums"]["post_kind"]
          likes?: number
          pdf_url?: string | null
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          title_ar: string
          title_en?: string
          updated_at?: string
          views?: number
        }
        Update: {
          body_ar?: string | null
          body_en?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["post_kind"]
          likes?: number
          pdf_url?: string | null
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          title_ar?: string
          title_en?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      roadmap_stages: {
        Row: {
          description_ar: string | null
          description_en: string | null
          end_date: string | null
          id: string
          order_index: number
          start_date: string | null
          status: string
          title_ar: string
          title_en: string
        }
        Insert: {
          description_ar?: string | null
          description_en?: string | null
          end_date?: string | null
          id?: string
          order_index: number
          start_date?: string | null
          status?: string
          title_ar: string
          title_en: string
        }
        Update: {
          description_ar?: string | null
          description_en?: string | null
          end_date?: string | null
          id?: string
          order_index?: number
          start_date?: string | null
          status?: string
          title_ar?: string
          title_en?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          banner_url: string | null
          email: string | null
          id: number
          org_name_ar: string | null
          org_name_en: string | null
          phone: string | null
          socials: Json
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          email?: string | null
          id?: number
          org_name_ar?: string | null
          org_name_en?: string | null
          phone?: string | null
          socials?: Json
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          email?: string | null
          id?: number
          org_name_ar?: string | null
          org_name_en?: string | null
          phone?: string | null
          socials?: Json
          updated_at?: string
        }
        Relationships: []
      }
      state_indicators: {
        Row: {
          category: string
          id: string
          label_ar: string
          label_en: string
          pdf_url: string | null
          sort_order: number
          state_code: string
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          category: string
          id?: string
          label_ar: string
          label_en: string
          pdf_url?: string | null
          sort_order?: number
          state_code: string
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          category?: string
          id?: string
          label_ar?: string
          label_en?: string
          pdf_url?: string | null
          sort_order?: number
          state_code?: string
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "state_indicators_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
      states: {
        Row: {
          code: string
          lat: number | null
          lng: number | null
          maturity: number
          name_ar: string
          name_en: string
          updated_at: string
        }
        Insert: {
          code: string
          lat?: number | null
          lng?: number | null
          maturity?: number
          name_ar: string
          name_en: string
          updated_at?: string
        }
        Update: {
          code?: string
          lat?: number | null
          lng?: number | null
          maturity?: number
          name_ar?: string
          name_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          due_at: string | null
          id: string
          owner: string | null
          stage_id: string | null
          status: string
          title_ar: string
          title_en: string
        }
        Insert: {
          due_at?: string | null
          id?: string
          owner?: string | null
          stage_id?: string | null
          status?: string
          title_ar: string
          title_en: string
        }
        Update: {
          due_at?: string | null
          id?: string
          owner?: string | null
          stage_id?: string | null
          status?: string
          title_ar?: string
          title_en?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "roadmap_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          avatar_url: string | null
          bio_ar: string | null
          bio_en: string | null
          id: string
          name_ar: string
          name_en: string
          role_ar: string | null
          role_en: string | null
          sort_order: number
        }
        Insert: {
          avatar_url?: string | null
          bio_ar?: string | null
          bio_en?: string | null
          id?: string
          name_ar: string
          name_en: string
          role_ar?: string | null
          role_en?: string | null
          sort_order?: number
        }
        Update: {
          avatar_url?: string | null
          bio_ar?: string | null
          bio_en?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          role_ar?: string | null
          role_en?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_post_views: { Args: { _slug: string }; Returns: undefined }
      toggle_post_like: {
        Args: { _delta: number; _slug: string }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      post_kind: "news" | "article" | "report"
      post_status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      post_kind: ["news", "article", "report"],
      post_status: ["draft", "published"],
    },
  },
} as const
