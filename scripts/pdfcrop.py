#!/bin/python3

import argparse
from PyPDF2 import PdfFileWriter, PdfFileReader

def crop_pdf(pdf_file, page_num, x1, y1, x2, y2, out):
    page_num = int(page_num)
    x1, y1, x2, y2 = map(float, [x1, y1, x2, y2])

    with open(pdf_file, "rb") as in_f:
        input1 = PdfFileReader(in_f)
        output = PdfFileWriter()

        page = input1.getPage(page_num)
        #print(page.mediaBox.getUpperRight_x(), page.mediaBox.getUpperRight_y())
        page.trimBox.lowerLeft = (x1, y1)
        page.trimBox.upperRight = (x2, y2)
        page.cropBox.lowerLeft = (x1, y1)
        page.cropBox.upperRight = (x2, y2)
        output.addPage(page)

        with open(out, "wb") as out_f:
            output.write(out_f)

if __name__ == "__main__":
    # Set up the argument parser
    parser = argparse.ArgumentParser(description="Crop a part of PDF file.")
    parser.add_argument("pdf_file", help="Path to the PDF file")
    parser.add_argument("page_num", help="Page number")
    parser.add_argument("x1", help="x1")
    parser.add_argument("y1", help="y1")
    parser.add_argument("x2", help="x2")
    parser.add_argument("y2", help="y2")
    parser.add_argument("out", help="Output PDF")

    # Parse the command-line arguments
    args = parser.parse_args()

    # Extract text and coordinates from the PDF
    crop_pdf(args.pdf_file, args.page_num, args.x1, args.y1, args.x2, args.y2, args.out)