from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

class TranslationModel:
    def __init__(self, model_name="facebook/mbart-large-50-many-to-many-mmt"):
        """
        Initialize the M2M translation model.
        
        Args:
            model_name: HuggingFace model identifier for m-BART
        """
        self.model_name = model_name
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load tokenizer and model
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(self.device)
        self.model.eval()
        
    def translate(self, text, source_lang, target_lang):
        """
        Translate text from source language to target language.
        
        Args:
            text: Input text to translate
            source_lang: Source language code (e.g., "hi_IN", "en_XX")
            target_lang: Target language code (e.g., "en_XX", "hi_IN")
            
        Returns:
            Translated text
        """
        # Set source language
        self.tokenizer.src_lang = source_lang
        
        # Encode input text
        encoded = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        encoded = {k: v.to(self.device) for k, v in encoded.items()}
        
        # Generate translation
        with torch.no_grad():
            generated_tokens = self.model.generate(
                **encoded,
                forced_bos_token_id=self.tokenizer.convert_tokens_to_ids(target_lang),
                max_length=150,
                num_beams=4
            )
        
        # Decode translation
        translation = self.tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
        return translation[0]
    
    def hindi_to_english(self, text):
        """Translate Hindi to English"""
        return self.translate(text, source_lang="hi_IN", target_lang="en_XX")

    def english_to_hindi(self, text):
        """Translate English to Hindi"""
        return self.translate(text, source_lang="en_XX", target_lang="hi_IN") 