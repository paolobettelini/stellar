#!/bin/python3

import argparse
from pdfminer.layout import LAParams, LTTextBox
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator

def extract_text_from_pdf(pdf_file):
    # Open the PDF file
    fp = open(pdf_file, 'rb')

    # Initialize PDF resource manager and parameters
    rsrcmgr = PDFResourceManager()
    laparams = LAParams()
    device = PDFPageAggregator(rsrcmgr, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)

    # Get the PDF pages
    pages = PDFPage.get_pages(fp)

    # Initialize a variable to keep track of the page number
    page_number = 1

    # Iterate through each page
    for page in pages:
        # Process the page and get layout
        interpreter.process_page(page)
        layout = device.get_result()

        # Iterate through the layout objects
        for lobj in layout:
            if isinstance(lobj, LTTextBox):
                # Get coordinates and text
                x, y, text = lobj.bbox[0], lobj.bbox[3], lobj.get_text().strip()

                if text.startswith("!"):
                    # Clean characters.
                    # TODO: ' needs to ne replace, but the other characters should be supported

                    clean_text = text.replace('’', '\'').replace('ﬀ', 'ff').replace('ô', 'o')
                    # Print "x y page_number [text]"
                    print(f'{x} {y} {page_number} [{clean_text}]')

        # Increment the page number for the next iteration
        page_number += 1

    # Close the PDF file
    fp.close()

if __name__ == "__main__":
    # Set up the argument parser
    parser = argparse.ArgumentParser(description="Extract text and coordinates from a PDF file.")
    parser.add_argument("pdf_file", help="Path to the PDF file")

    # Parse the command-line arguments
    args = parser.parse_args()

    # Extract text and coordinates from the PDF
    extract_text_from_pdf(args.pdf_file)