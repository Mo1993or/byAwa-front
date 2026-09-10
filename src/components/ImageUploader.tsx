import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BUCKET = "product-images";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
const MAX_SIZE = 5 * 1024 * 1024;

type Props = {
  value: string[];
  onChange: (images: string[]) => void;
  max?: number;
  className?: string;
};

/** Téléversement d'images produit (galerie + ajout par URL). */
export function ImageUploader({ value, onChange, max = 6, className }: Props) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const { data: auth } = await supabase.auth.getUser();
    const userId = auth.user?.id;
    if (!userId) {
      toast.error("Session expirée, reconnectez-vous");
      return;
    }
    const slots = max - value.length;
    if (slots <= 0) {
      toast.error(`Maximum ${max} images`);
      return;
    }

    setUploading(true);
    const added: string[] = [];
    for (const file of Array.from(files).slice(0, slots)) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} n'est pas une image`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} dépasse 5 Mo`);
        continue;
      }
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (error) {
        toast.error("Téléversement impossible", { description: error.message });
        continue;
      }
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, TEN_YEARS);
      if (signed?.signedUrl) added.push(signed.signedUrl);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    if (added.length) {
      onChange([...value, ...added]);
      toast.success(`${added.length} image(s) ajoutée(s)`);
    }
  };

  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {value.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
          >
            <SmartImage src={src} alt={`Image ${index + 1}`} className="size-full object-cover" />
            {index === 0 ? (
              <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                Principale
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="Supprimer l'image"
              className="absolute right-1 top-1 rounded-full bg-background/90 p-1 text-foreground shadow-sm"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        {value.length < max ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-muted-foreground/30 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {uploading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <ImagePlus className="size-5" />
                <span className="text-[11px]">Ajouter</span>
              </>
            )}
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => void handleFiles(event.target.files)}
      />

      <div className="flex gap-2">
        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="…ou coller une URL d'image"
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const clean = url.trim();
            if (!clean) return;
            if (value.length >= max) {
              toast.error(`Maximum ${max} images`);
              return;
            }
            onChange([...value, clean]);
            setUrl("");
          }}
        >
          Ajouter
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        JPG/PNG/WebP · 5 Mo max · la première image est la photo principale.
      </p>
    </div>
  );
}
