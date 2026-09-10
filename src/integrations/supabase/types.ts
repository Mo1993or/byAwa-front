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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          details: string | null
          full_name: string
          id: string
          is_default: boolean
          label: string
          phone: string
          street: string | null
          updated_at: string
          user_id: string
          zone: string | null
        }
        Insert: {
          city: string
          created_at?: string
          details?: string | null
          full_name: string
          id?: string
          is_default?: boolean
          label?: string
          phone: string
          street?: string | null
          updated_at?: string
          user_id: string
          zone?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          details?: string | null
          full_name?: string
          id?: string
          is_default?: boolean
          label?: string
          phone?: string
          street?: string | null
          updated_at?: string
          user_id?: string
          zone?: string | null
        }
        Relationships: []
      }
      banners: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          link: string | null
          position: number
          subtitle: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          link?: string | null
          position?: number
          subtitle?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          link?: string | null
          position?: number
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          commission_rate: number | null
          created_at: string
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          parent_id: string | null
          position: number
          slug: string
          updated_at: string
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          parent_id?: string | null
          position?: number
          slug: string
          updated_at?: string
        }
        Update: {
          commission_rate?: number | null
          created_at?: string
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          parent_id?: string | null
          position?: number
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          min_amount: number
          usage_limit: number | null
          used_count: number
          vendor_id: string | null
        }
        Insert: {
          code: string
          created_at?: string
          discount_type?: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          min_amount?: number
          usage_limit?: number | null
          used_count?: number
          vendor_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          min_amount?: number
          usage_limit?: number | null
          used_count?: number
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries: {
        Row: {
          created_at: string
          delivered_at: string | null
          driver_id: string | null
          fee: number
          id: string
          mode: string
          proof_url: string | null
          status: Database["public"]["Enums"]["delivery_status"]
          updated_at: string
          vendor_order_id: string
          zone_id: string | null
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          driver_id?: string | null
          fee?: number
          id?: string
          mode?: string
          proof_url?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
          updated_at?: string
          vendor_order_id: string
          zone_id?: string | null
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          driver_id?: string | null
          fee?: number
          id?: string
          mode?: string
          proof_url?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
          updated_at?: string
          vendor_order_id?: string
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_vendor_order_id_fkey"
            columns: ["vendor_order_id"]
            isOneToOne: false
            referencedRelation: "vendor_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "delivery_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_zones: {
        Row: {
          city: string
          created_at: string
          eta_days: number
          fee: number
          id: string
          is_active: boolean
          updated_at: string
          zone: string
        }
        Insert: {
          city: string
          created_at?: string
          eta_days?: number
          fee?: number
          id?: string
          is_active?: boolean
          updated_at?: string
          zone: string
        }
        Update: {
          city?: string
          created_at?: string
          eta_days?: number
          fee?: number
          id?: string
          is_active?: boolean
          updated_at?: string
          zone?: string
        }
        Relationships: []
      }
      drivers: {
        Row: {
          city: string | null
          created_at: string
          earnings: number
          full_name: string
          id: string
          is_active: boolean
          is_available: boolean
          phone: string | null
          updated_at: string
          user_id: string
          vehicle: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          earnings?: number
          full_name: string
          id?: string
          is_active?: boolean
          is_available?: boolean
          phone?: string | null
          updated_at?: string
          user_id: string
          vehicle?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          earnings?: number
          full_name?: string
          id?: string
          is_active?: boolean
          is_available?: boolean
          phone?: string | null
          updated_at?: string
          user_id?: string
          vehicle?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_events: {
        Row: {
          created_at: string
          id: string
          note: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "order_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          product_image: string | null
          product_name: string
          quantity: number
          total: number
          unit_price: number
          vendor_order_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          product_image?: string | null
          product_name: string
          quantity?: number
          total: number
          unit_price: number
          vendor_order_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          quantity?: number
          total?: number
          unit_price?: number
          vendor_order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_vendor_order_id_fkey"
            columns: ["vendor_order_id"]
            isOneToOne: false
            referencedRelation: "vendor_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_id: string | null
          created_at: string
          customer_id: string | null
          delivery_fee: number
          discount: number
          guest_email: string | null
          guest_name: string | null
          guest_phone: string | null
          id: string
          order_number: string
          payment_method: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          shipping_city: string | null
          shipping_name: string | null
          shipping_phone: string | null
          shipping_street: string | null
          shipping_zone: string | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          track_token: string
          updated_at: string
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          customer_id?: string | null
          delivery_fee?: number
          discount?: number
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          order_number: string
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping_city?: string | null
          shipping_name?: string | null
          shipping_phone?: string | null
          shipping_street?: string | null
          shipping_zone?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          track_token?: string
          updated_at?: string
        }
        Update: {
          address_id?: string | null
          created_at?: string
          customer_id?: string | null
          delivery_fee?: number
          discount?: number
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          order_number?: string
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping_city?: string | null
          shipping_name?: string | null
          shipping_phone?: string | null
          shipping_street?: string | null
          shipping_zone?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          track_token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          provider: string
          raw: Json | null
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          order_id: string
          provider?: string
          raw?: Json | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          provider?: string
          raw?: Json | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          name: string
          price_delta: number
          product_id: string
          stock: number
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price_delta?: number
          product_id: string
          stock?: number
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price_delta?: number
          product_id?: string
          stock?: number
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          attributes: Json
          brand: string | null
          category_id: string | null
          compare_at_price: number | null
          created_at: string
          description: string | null
          id: string
          images: string[]
          is_featured: boolean
          name: string
          price: number
          rating: number
          rejection_reason: string | null
          reviews_count: number
          sales_count: number
          sku: string | null
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          stock: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          attributes?: Json
          brand?: string | null
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[]
          is_featured?: boolean
          name: string
          price: number
          rating?: number
          rejection_reason?: string | null
          reviews_count?: number
          sales_count?: number
          sku?: string | null
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          stock?: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          attributes?: Json
          brand?: string | null
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[]
          is_featured?: boolean
          name?: string
          price?: number
          rating?: number
          rejection_reason?: string | null
          reviews_count?: number
          sales_count?: number
          sku?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          stock?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_blocked: boolean
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          is_blocked?: boolean
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_blocked?: boolean
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      returns: {
        Row: {
          created_at: string
          id: string
          order_id: string
          reason: string
          refund_amount: number | null
          status: Database["public"]["Enums"]["return_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          reason: string
          refund_amount?: number | null
          status?: Database["public"]["Enums"]["return_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          reason?: string
          refund_amount?: number | null
          status?: Database["public"]["Enums"]["return_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "returns_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_name: string | null
          comment: string | null
          created_at: string
          id: string
          is_approved: boolean
          is_reported: boolean
          product_id: string | null
          rating: number
          user_id: string
          vendor_id: string | null
        }
        Insert: {
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          is_reported?: boolean
          product_id?: string | null
          rating: number
          user_id: string
          vendor_id?: string | null
        }
        Update: {
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          is_reported?: boolean
          product_id?: string | null
          rating?: number
          user_id?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          order_id: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          order_id?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          order_id?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
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
      vendor_orders: {
        Row: {
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          net_amount: number
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          net_amount?: number
          order_id: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          net_amount?: number
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          business_info: string | null
          category_id: string | null
          city: string | null
          commission_rate: number | null
          cover_url: string | null
          created_at: string
          delivery_policy: string | null
          description: string | null
          email: string | null
          full_name: string
          id: string
          id_document_url: string | null
          is_featured: boolean
          logo_url: string | null
          membership_fee: number
          membership_method: string | null
          membership_paid_at: string | null
          membership_reference: string | null
          membership_status: string
          opening_hours: string | null
          payout_details: string | null
          payout_method: string | null
          phone: string | null
          rating: number
          rejection_reason: string | null
          shop_name: string
          slug: string
          status: Database["public"]["Enums"]["vendor_status"]
          terms: string | null
          updated_at: string
          user_id: string
          whatsapp: string | null
          zone: string | null
        }
        Insert: {
          address?: string | null
          business_info?: string | null
          category_id?: string | null
          city?: string | null
          commission_rate?: number | null
          cover_url?: string | null
          created_at?: string
          delivery_policy?: string | null
          description?: string | null
          email?: string | null
          full_name: string
          id?: string
          id_document_url?: string | null
          is_featured?: boolean
          logo_url?: string | null
          membership_fee?: number
          membership_method?: string | null
          membership_paid_at?: string | null
          membership_reference?: string | null
          membership_status?: string
          opening_hours?: string | null
          payout_details?: string | null
          payout_method?: string | null
          phone?: string | null
          rating?: number
          rejection_reason?: string | null
          shop_name: string
          slug: string
          status?: Database["public"]["Enums"]["vendor_status"]
          terms?: string | null
          updated_at?: string
          user_id: string
          whatsapp?: string | null
          zone?: string | null
        }
        Update: {
          address?: string | null
          business_info?: string | null
          category_id?: string | null
          city?: string | null
          commission_rate?: number | null
          cover_url?: string | null
          created_at?: string
          delivery_policy?: string | null
          description?: string | null
          email?: string | null
          full_name?: string
          id?: string
          id_document_url?: string | null
          is_featured?: boolean
          logo_url?: string | null
          membership_fee?: number
          membership_method?: string | null
          membership_paid_at?: string | null
          membership_reference?: string | null
          membership_status?: string
          opening_hours?: string | null
          payout_details?: string | null
          payout_method?: string | null
          phone?: string | null
          rating?: number
          rejection_reason?: string | null
          shop_name?: string
          slug?: string
          status?: Database["public"]["Enums"]["vendor_status"]
          terms?: string | null
          updated_at?: string
          user_id?: string
          whatsapp?: string | null
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          type: string
          vendor_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          type: string
          vendor_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          type?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          pending_balance: number
          total_earned: number
          total_withdrawn: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          pending_balance?: number
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          pending_balance?: number
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          admin_note: string | null
          amount: number
          created_at: string
          details: string | null
          id: string
          method: string | null
          status: Database["public"]["Enums"]["withdrawal_status"]
          updated_at: string
          vendor_id: string
        }
        Insert: {
          admin_note?: string | null
          amount: number
          created_at?: string
          details?: string | null
          id?: string
          method?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          vendor_id: string
        }
        Update: {
          admin_note?: string | null
          amount?: number
          created_at?: string
          details?: string | null
          id?: string
          method?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
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
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      owns_vendor: {
        Args: { _user_id: string; _vendor_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "orders_manager"
        | "vendors_manager"
        | "delivery_manager"
        | "support_manager"
        | "vendor"
        | "driver"
        | "customer"
      delivery_status:
        | "to_prepare"
        | "ready"
        | "assigned"
        | "delivering"
        | "delivered"
        | "failed"
      order_status:
        | "placed"
        | "paid"
        | "preparing"
        | "shipped"
        | "delivering"
        | "delivered"
        | "cancelled"
        | "returned"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      product_status: "draft" | "pending" | "approved" | "rejected" | "disabled"
      return_status:
        | "requested"
        | "approved"
        | "refused"
        | "received"
        | "refunded"
      ticket_status: "open" | "pending" | "resolved" | "closed"
      vendor_status:
        | "pending"
        | "verifying"
        | "approved"
        | "rejected"
        | "suspended"
        | "blocked"
      withdrawal_status: "requested" | "processing" | "paid" | "rejected"
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
      app_role: [
        "super_admin",
        "admin",
        "orders_manager",
        "vendors_manager",
        "delivery_manager",
        "support_manager",
        "vendor",
        "driver",
        "customer",
      ],
      delivery_status: [
        "to_prepare",
        "ready",
        "assigned",
        "delivering",
        "delivered",
        "failed",
      ],
      order_status: [
        "placed",
        "paid",
        "preparing",
        "shipped",
        "delivering",
        "delivered",
        "cancelled",
        "returned",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
      product_status: ["draft", "pending", "approved", "rejected", "disabled"],
      return_status: [
        "requested",
        "approved",
        "refused",
        "received",
        "refunded",
      ],
      ticket_status: ["open", "pending", "resolved", "closed"],
      vendor_status: [
        "pending",
        "verifying",
        "approved",
        "rejected",
        "suspended",
        "blocked",
      ],
      withdrawal_status: ["requested", "processing", "paid", "rejected"],
    },
  },
} as const
