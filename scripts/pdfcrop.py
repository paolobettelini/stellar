#!/bin/python3

import pymupdf
import argparse

# PyMuPDF Doc
# https://pymupdf.readthedocs.io/en/latest/document.html

def crop_and_redact_pdf(input_pdf, output_pdf, y1, y2, right_margin, left_margin, page_number):
    # Open the input PDF using PyMuPDF
    pdf_document = pymupdf.open(input_pdf)

    page = pdf_document[page_number]

    page_original_height = page.cropbox.height
    page_original_width = page.cropbox.width

    x1 = left_margin
    x2 = page_original_width - right_margin

    y1,y2 = y2,y1
    snippet_height = y2 - y1

    redact_y1_offset = -4 # some math character go beyond the rect (?)
    y1 += redact_y1_offset

    # Remove content outside crop region
    # you can add the parameter fill=(1,0,0) to check the region (need to remove the set_mediabox below in order to see it)
    page.add_redact_annot((0, 0, page_original_width, page_original_height - y2))
    page.add_redact_annot((0, page_original_height - y1, page_original_width, page_original_height))
    page.add_redact_annot((x2, 0, page_original_width, page_original_height))
    page.add_redact_annot((0, 0, x1, page_original_height))

    y1 -= redact_y1_offset

    # Crop the page to the specified bounding box
    page.set_mediabox((x1, y1, x2, y2))

    # Apply the redaction to the page
    page.apply_redactions()

    # Save the modified PDF to the output file
    pdf_document.save(output_pdf, garbage=4, deflate=True)

    # Close the PDF document
    pdf_document.close()

if __name__ == '__main__':
    # Define command-line arguments
    parser = argparse.ArgumentParser(description='Crop and redact a PDF file.')
    parser.add_argument('input_pdf', help='Input PDF file')
    parser.add_argument('output_pdf', help='Output PDF file')
    parser.add_argument('y1', type=float, help='y1 coordinate of the crop box')
    parser.add_argument('y2', type=float, help='y2 coordinate of the crop box')
    parser.add_argument('right_margin', type=float, help='right_margin of the crop box')
    parser.add_argument('left_margin', type=float, help='left_margin of the crop box')
    parser.add_argument('page_number', type=int, help='page number')

    args = parser.parse_args()

    # Crop and redact the PDF
    crop_and_redact_pdf(args.input_pdf, args.output_pdf, args.y1, args.y2, args.right_margin, args.left_margin, args.page_number)